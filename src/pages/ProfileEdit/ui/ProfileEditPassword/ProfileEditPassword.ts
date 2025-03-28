import { ProfileEditPasswordService } from '../../model/service/profileEditPassword';
import pictureFillIcon from 'assets/icons/PictureFill.svg';
import Block from 'shared/lib/Block';
import template from './ProfileEditPassword.hbs';
import { EditForm, FormType } from 'entities/Profile';

type UserFormData = Record<string, string>;

export const editPassFields = [
    {
        label: 'Старый пароль',
        inputName: 'oldPassword',
        type: 'password',
        inputId: 'oldPassword',
    },
    {
        label: 'Новый пароль',
        inputName: 'newPassword',
        type: 'password',
        inputId: 'newPassword',
    },
    {
        label: 'Повторите новый пароль',
        inputName: 'newPassword',
        type: 'password',
        inputId: 'newPassword2',
    },
];

export class ProfileEditPasswordPage extends Block {
    protected readonly editFormService = new ProfileEditPasswordService();

    constructor() {
        super({
            EditForm: new EditForm({
                formType: 'password',
                avatarIconSrc: pictureFillIcon,
                cancelButtonLabel: 'Отмена',
                ProfileEditItems: editPassFields,
                formId: 'formEditPassword',
                SubmitButton: {
                    label: 'Сохранить',
                    onSubmit: async (
                        formType: FormType,
                        userData: UserFormData,
                    ) => {
                        const statusCode = await this.editFormService.PutUser(
                            formType,
                            userData,
                        );

                        return statusCode;
                    },
                },
            }),
        });
    }

    render() {
        return template;
    }
}
