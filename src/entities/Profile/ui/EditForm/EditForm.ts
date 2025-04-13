import { UserAvatar } from 'entities/UserAvatar';
import template from './EditForm.hbs';
import Block from 'app/lib/Block';
import { Button } from 'shared/ui/Button/Button';
import { validate } from 'utils/validate';
import { Input } from 'shared/ui/Input/Input';
import { AppRoutes } from 'app/lib/Router';
import { ProfileEditItem } from '../ProfileEditItem/ProfileEditItem';
import { ProfilePage } from 'pages/Profile';
import './EditForm.scss';

type UserFormData = Record<string, string>;

export type FormType = 'profile' | 'password';

interface EditFormProps {
    formType: FormType;
    avatarImageSrc?: string;
    ProfileEditItems: {
        label: string;
        value?: string;
        inputName: string;
        type: string;
        inputId: string;
    }[];
    onUploadAvatar?: (file: File) => void;
    SubmitButton: {
        label: string;
        onSubmit: (
            formType: FormType,
            userData: UserFormData,
        ) => Promise<number>;
    };
    cancelButtonLabel: string;
    formId: string;
}

export class EditForm extends Block {
    constructor(props: EditFormProps) {
        const hasImage = !!props.avatarImageSrc;
        const isProfile = props.formType === 'profile';

        super({
            ...props,
            isProfile,
            title:
                props.formType === 'profile'
                    ? 'Редактирование профиля'
                    : 'Изменение пароля',
            UserAvatar: new UserAvatar({
                className:
                    isProfile && hasImage ? 'has-image edit-form-avatar' : '',
                imageSrc: props.avatarImageSrc,
                onClick: () => {
                    if (isProfile) {
                        const fileInput = document.getElementById(
                            'avatar',
                        ) as HTMLInputElement;
                        fileInput?.click();
                        fileInput.onchange = (e) => {
                            if (!props.onUploadAvatar) {
                                return;
                            }
                            const input = e.target as HTMLInputElement;
                            const file = input.files?.[0];

                            if (file) {
                                props.onUploadAvatar(file);
                            }
                        };
                    }
                },
            }),
            ProfileEditItems: props.ProfileEditItems.map(
                (field, idx) =>
                    new ProfileEditItem({
                        ...field,
                        onBlur: () => {
                            const input = document.getElementById(
                                field.inputId,
                            ) as HTMLInputElement;
                            const errMessage = validate(
                                field.inputName,
                                input.value as string,
                            );
                            const fieldEl = this.lists.ProfileEditItems[
                                idx
                            ] as Input;

                            if (errMessage) {
                                fieldEl.setProps({
                                    error: errMessage,
                                });

                                return;
                            }
                            fieldEl.setProps({ error: undefined });
                        },
                    }),
            ),
            SubmitButton: new Button({
                theme: 'background',
                text: props.SubmitButton.label,
                className: 'submit-button',
                type: 'submit',
                onClick: async () => {
                    let hasErrors = false;
                    const userData = {} as UserFormData;
                    const form = document.getElementById(
                        `${props.formId}`,
                    ) as HTMLFormElement;
                    const formData = new FormData(form);

                    props.ProfileEditItems.map((field, idx) => {
                        const fieldValue = formData.get(field.inputName);
                        const errMessage = validate(
                            field.inputName,
                            fieldValue as string,
                        );
                        if (errMessage) {
                            hasErrors = true;
                            console.error('hasError');

                            const field = this.lists.ProfileEditItems[
                                idx
                            ] as Input;
                            field.setProps({ error: errMessage });

                            return;
                        }
                        userData[field.inputName as keyof UserFormData] =
                            fieldValue as string;
                    });

                    if (hasErrors) return;

                    const statusCode = await props.SubmitButton.onSubmit(
                        props.formType,
                        userData,
                    );

                    if (statusCode === 200) {
                        this.RouterService.reassign(
                            AppRoutes.PROFILE,
                            ProfilePage,
                        );
                        this.RouterService.go(AppRoutes.PROFILE);
                    } else if (statusCode === 401) {
                        this.RouterService.go(AppRoutes.AUTH);
                    }
                },
            }),
            CancelButton: new Button({
                theme: 'clear',
                type: 'reset',
                text: props.cancelButtonLabel,
                className: 'cancel-button',
                onClick: () => {
                    this.RouterService.go(AppRoutes.PROFILE);
                    this.RouterService.reassign(AppRoutes.PROFILE, ProfilePage);
                },
            }),
        });
    }

    render() {
        return template;
    }
}
