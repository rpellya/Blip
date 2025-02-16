import Handlebars from 'handlebars';
import template from './Button.hbs';
import { Component } from 'shared/lib/Component';
import './Button.scss';

export type ButtonVariant = 'clear' | 'outline' | 'background';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    text: string;
    theme?: ButtonVariant;
    className?: string;
    onClick?: () => void;
}

export class Button extends Component<ButtonProps> {
    protected events(): Array<[string, EventListener]> {
        throw new Error('Method not implemented.');
    }

    private buttonElement: HTMLButtonElement | null = null;

    constructor(props: ButtonProps) {
        super('button', props);
    }

    render(): string {
        return Handlebars.compile(template)(this.props);
    }

    mount(parent: HTMLElement): void {
        this.buttonElement = parent.querySelector(
            `button.${this.props.className}`,
        );
        if (this.buttonElement && this.props.onClick) {
            this.buttonElement.addEventListener('click', this.handleClick);
        }
    }

    private handleClick = (e: Event): void => {
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    destroy(): void {
        if (this.buttonElement) {
            this.buttonElement.removeEventListener('click', this.handleClick);
            this.buttonElement = null;
        }
    }
}
