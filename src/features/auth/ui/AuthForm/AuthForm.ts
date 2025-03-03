import template from './AuthForm.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { validate } from 'utils/validate';
import { AppRoutes } from 'app/lib/Router';
import './AuthForm.scss';

interface AuthFormProps {
    title: string;
    formId: string;
    AuthFields: {
        label: string;
        inputName: string;
        inputId: string;
    }[];
    submitButton: {
        text: string;
        onClick: () => void;
    };
    signInButton: {
        text: string;
        onClick: () => void;
    };
}

export class AuthForm extends Block {
    constructor(props: AuthFormProps) {
        super({
            ...props,
            AuthFields: props.AuthFields.map(
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
                                input.value,
                                true,
                            );
                            const fieldEl = this.lists.AuthFields[
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
            authButton: new Button({
                text: props.submitButton.text,
                theme: 'background',
                onClick: () => {
                    let hasErrors = false;
                    const form = document.getElementById(
                        `${props.formId}`,
                    ) as HTMLFormElement;
                    const formData = new FormData(form);

                    props.AuthFields.forEach((field, index) => {
                        const fieldValue = formData.get(field.inputName);
                        const errMessage = validate(
                            field.inputName,
                            fieldValue as string,
                            true,
                        );
                        if (errMessage) {
                            hasErrors = true;
                            const field = this.lists.AuthFields[index] as Input;
                            field.setProps({ error: errMessage });
                            return;
                        }
                        console.log(`${field.inputName}: ${fieldValue}`);
                        if (hasErrors) return;

                        this.RouterService.go(AppRoutes.CHATS);
                    });
                },
            }),
            signInButton: new Button({
                ...props.signInButton,
                text: props.signInButton.text,
                type: 'button',
                theme: 'clear',
            }),
        });
    }

    render() {
        return template;
    }
}
