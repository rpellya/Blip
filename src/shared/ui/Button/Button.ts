import template from './Button.hbs';
import Block from '../../lib/Block';
import './Button.scss';

export type ButtonVariant = 'clear' | 'outline' | 'outline_red' | 'background';
interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    theme?: ButtonVariant;
    className?: string;
    onClick?: (e: Event) => void;
}

export class Button extends Block {
    static componentName: string = 'Button';

    constructor(props: ButtonProps) {
        super({
            ...props,
            events: {
                click: (e: Event) => props?.onClick?.(e),
            },
        });
    }

    override render(): string {
        return template;
    }
}
