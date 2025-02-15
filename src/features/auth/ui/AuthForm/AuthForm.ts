import Handlebars from 'handlebars';
import template from './AuthForm.hbs';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Link } from 'shared/ui/Link/Link';
import './AuthForm.scss';

interface AuthFormProps {
    formId: string;
    title: string;
    inputs: Input[];
    button: Button;
    link: Link;
}

export class AuthForm {
    private props: AuthFormProps;

    constructor(props: AuthFormProps) {
        this.props = props;
    }

    render(): string {
        return Handlebars.compile(template)({
            ...this.props,
            title: this.props.title,
            inputs: this.props.inputs.map(input => input.render()),
            button: this.props.button.render(),
            link: this.props.link.render()
        });
    }

    mount(parent: HTMLElement): void {
        this.props.inputs.forEach(input => input.mount(parent));
        this.props.button.mount(parent);
        this.props.link.mount(parent);
    }

    destroy(): void {
        this.props.inputs.forEach(input => input.destroy());
        this.props.button.destroy();
        this.props.link.destroy();
    }
}