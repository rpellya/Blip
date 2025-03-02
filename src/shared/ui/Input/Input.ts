import Block from 'shared/lib/Block';
import template from './Input.hbs';
import './Input.scss';

export type InputVariant = 'default' | 'clear' | 'outline_bottom';

interface InputProps {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    theme?: InputVariant;
    required?: boolean;
    className?: string;
    value?: string;
    error?: string;
    onBlur?: () => void;
}

export class Input extends Block {
    constructor(props: Partial<InputProps>) {
        super({
            theme: 'default',
            ...props,
            events: {
                blur: () => {
                    props?.onBlur?.();
                },
            },
        });
    }

    override render() {
        return template;
    }
}
