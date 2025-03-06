import template from './ProfileForm.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { AppRoutes } from 'app/lib/Router';
import { profileFormFields } from '../model/types/ProfileFormFields';
import { validate } from 'utils/validate';
import './ProfileForm.scss';

interface ProfileFormProps {
    formId: string;
}

export class ProfileForm extends Block {
    constructor(props: ProfileFormProps) {
        super({
            ...props,
            inputs: profileFormFields.map(
                (field, index) =>
                    new Input({
                        ...field,
                        theme: 'outline_bottom',
                        onBlur: () => {
                            const input = document.getElementById(
                                field.inputId,
                            ) as HTMLInputElement;
                            const errMessage = validate(
                                field.inputName,
                                input.value as string,
                            );
                            const fieldEl = this.lists.profileFormFields[
                                index
                            ] as Input;

                            if (errMessage) {
                                fieldEl.setProps({ error: errMessage });

                                return;
                            }
                            fieldEl.setProps({ error: undefined });
                        },
                    }),
            ),
            logOutButton: new Button({
                text: 'Выйти',
                theme: 'outline_red',
                onClick: () => this.RouterService.go(AppRoutes.AUTH),
            }),
            saveButton: new Button({
                text: 'Сохранить',
                type: 'submit',
                theme: 'background',
                onClick: () => {
                    let hasErrors = false;
                    const form = document.getElementById(
                        `${props.formId}`,
                    ) as HTMLFormElement;
                    const formData = new FormData(form);

                    profileFormFields.forEach((field, index) => {
                        const fieldValue = formData.get(field.inputName);
                        const errMessage = validate(
                            field.inputName,
                            fieldValue as string,
                            true,
                        );
                        if (errMessage) {
                            hasErrors = true;
                            const field = this.lists.inputs[index] as Input;
                            field.setProps({ error: errMessage });
                            return;
                        }
                        console.log(`${field.inputName}: ${fieldValue}`);
                    });
                    if (hasErrors) return;

                    this.RouterService.go(AppRoutes.CHATS);
                },
            }),
        });
    }

    render(): string {
        return template;
    }
}
