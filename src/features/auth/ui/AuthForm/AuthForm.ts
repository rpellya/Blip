import template from './AuthForm.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { validate } from 'utils/validate';
import { AppRoutes } from 'app/lib/Router';
import {
    AuthService,
    FormType,
    UserFormData,
} from '../../model/service/authForm';
import './AuthForm.scss';

interface AuthFormProps {
    formType: FormType;
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
    signUpButton: {
        text: string;
        onClick: () => void;
    };
}

export class AuthForm extends Block {
    protected readonly authService = new AuthService();

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
            SubmitButton: new Button({
                text: props.submitButton.text,
                theme: 'background',
                onClick: async () => {
                    let hasErrors = false;
                    const userData: UserFormData = {} as never;
                    const form = document.getElementById(
                        `${props.formId}`,
                    ) as HTMLFormElement;
                    const formData = new FormData(form);

                    props.AuthFields.map(async (field, index) => {
                        const fieldValue = formData.get(field.inputName);
                        const errMessage = validate(
                            field.inputName,
                            fieldValue as string,
                            true,
                        );

                        if (errMessage || !fieldValue) {
                            hasErrors = true;
                            const field = this.lists.AuthFields[index] as Input;
                            field.setProps({ error: errMessage });

                            return;
                        }

                        userData[field.inputName as keyof UserFormData] =
                            fieldValue as string;
                    });

                    if (hasErrors) return;

                    const result = await this.authService.PostUser(
                        props.formType,
                        userData,
                    );

                    if (!result) return;

                    if (result.status === 200) {
                        this.RouterService.go(AppRoutes.MESSENGER);
                        return;
                    }

                    const error = JSON.parse(result.response).reason;

                    if (error === 'User already in system') {
                        this.RouterService.go(AppRoutes.MESSENGER);
                    }
                },
            }),
            SignUpButton: new Button({
                ...props.signUpButton,
                text: props.signUpButton.text,
                type: 'button',
                theme: 'clear',
            }),
        });
    }

    render() {
        return template;
    }
}
