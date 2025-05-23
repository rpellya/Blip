import Block from 'app/lib/Block';
import { ProfileEditInfoService } from '../../model/service/profileEditInfo';
import template from './ProfileEditInfo.hbs';
import { EditForm, FormType } from 'entities/Profile';
import { AppRoutes } from 'app/lib/Router';
import { getAvatarSrc } from 'utils/getEndPoint';

const getProfileEditItems = (data: Record<string, string>) => [
    {
        label: 'Имя',
        inputName: 'first_name',
        value: data.first_name,
        type: 'text',
        inputId: 'first_name',
    },
    {
        label: 'Фамилия',
        inputName: 'second_name',
        value: data.second_name,
        type: 'text',
        inputId: 'second_name',
    },
    {
        label: 'Имя в чате',
        inputName: 'display_name',
        value: data.display_name,
        type: 'text',
        inputId: 'display_name',
    },
    {
        label: 'Логин',
        inputName: 'login',
        value: data.login,
        type: 'login',
        inputId: 'login',
    },
    {
        label: 'Почта',
        inputName: 'email',
        value: data.email,
        type: 'email',
        inputId: 'email',
    },
    {
        label: 'Телефон',
        inputName: 'phone',
        value: data.phone,
        type: 'phone',
        inputId: 'phone',
    },
];

export class ProfileEditInfoPage extends Block {
    protected readonly editFormService = new ProfileEditInfoService();

    constructor() {
        super();

        setTimeout(async () => {
            const result = await this.editFormService.GetUser();

            if (result.status === 200) {
                const data = JSON.parse(result.response);

                this.setProps({
                    EditForm: new EditForm({
                        formType: 'profile',
                        avatarImageSrc: getAvatarSrc(data.avatar),
                        cancelButtonLabel: 'Отмена',
                        formId: 'formEditProfile',
                        onUploadAvatar: (file: File) =>
                            this.editFormService.UploadAvatar(file),
                        ProfileEditItems: getProfileEditItems(data),
                        SubmitButton: {
                            label: 'Сохранить',
                            onSubmit: async (
                                formType: FormType,
                                userData: Record<string, string>,
                            ) => {
                                const result =
                                    await this.editFormService.PutUser(
                                        formType,
                                        userData,
                                    );

                                return result;
                            },
                        },
                    }),
                });
            } else if (result.status === 401) {
                this.RouterService.go(AppRoutes.AUTH);
            }
        });
    }

    render(): string {
        return template;
    }
}
