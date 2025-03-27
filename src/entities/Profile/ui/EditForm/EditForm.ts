import { UserAvatar } from 'entities/UserAvatar';
import template from './EditForm.hbs';
import Block from 'shared/lib/Block';
import { Button } from 'shared/ui/Button/Button';
import { validate } from 'utils/validate';
import { Input } from 'shared/ui/Input/Input';
import { AppRoutes } from 'app/lib/Router';
import { ProfileEditItem } from '../ProfileEditItem/ProfileEditItem';
import './EditForm.scss';

type UserFormData = Record<string, string>;

export type FormType = 'profile' | 'password';

interface EditFormProps {
    formType: FormType;
    avatarImageSrc?: string;
    avatarIconSrc: string;
    ProfileEditItems: {
        label: string;
        value?: string;
        inputName: string;
        type: string;
        inputId: string;
    }[];
    SubmitButton: {
        label: string;
        onSubmit?: (
            formType: FormType,
            userData: UserFormData,
        ) => Promise<number>;
    };
    cancelButtonLabel: string;
    formId: string;
}

export class EditForm extends Block {
    constructor(props: EditFormProps) {
        super({
            ...props,
            title:
                props.formType === 'profile'
                    ? 'Редактирование профиля'
                    : 'Изменение пароля',
            UserAvatar: new UserAvatar({
                iconSrc: props.avatarIconSrc,
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
                    const userData: UserFormData = {} as never;
                    const form = document.getElementById(
                        `${props.formId}`,
                    ) as HTMLFormElement;
                    const formData = new FormData(form);

                    props.ProfileEditItems.forEach((field, idx) => {
                        const fieldValue = formData.get(field.inputName);
                        const errMessage = validate(
                            field.inputName,
                            fieldValue as string,
                        );
                        if (errMessage) {
                            hasErrors = true;
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

                    const result = await props.SubmitButton.onSubmit?.(
                        props.formType,
                        userData,
                    );

                    if (result === 200) {
                        this.RouterService.go(AppRoutes.PROFILE);
                    }
                },
            }),
            CancelButton: new Button({
                theme: 'clear',
                type: 'reset',
                text: props.cancelButtonLabel,
                className: 'cancel-button',
                onClick: () => this.RouterService.go(AppRoutes.PROFILE),
            }),
        });
    }

    render() {
        return template;
    }
}
