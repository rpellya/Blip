import template from './AuthForm.hbs';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import Block from 'shared/lib/Block';
import './AuthForm.scss';

interface AuthFormProps {
    title: string;
    formId: string;
    inputs: {
        type: string;
        name: string;
        label: string;
        inputId: string;
        required?: boolean;
        placeholder?: string;
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
            inputs: props.inputs.map(
                (field) => new Input({ ...field, theme: 'outline_bottom' }),
            ),
            authButton: new Button({
                text: props.submitButton.text,
                type: 'submit',
                theme: 'background',
                onClick: props.submitButton.onClick,
            }),
            signInButton: new Button({
                text: props.signInButton.text,
                type: 'button',
                theme: 'clear',
                onClick: props.signInButton.onClick,
            }),
        });
    }

    override render() {
        return template;
    }
}
