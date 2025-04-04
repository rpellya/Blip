import Block from 'shared/lib/Block';
import template from './Input.hbs';
import { InputField } from './InputField';
import './Input.scss';

export type InputVariant = 'default' | 'clear' | 'outline_bottom';

export interface InputProps {
    label?: string;
    inputName?: string;
    type?: string;
    inputId?: string;
    required?: boolean;
    theme?: InputVariant;
    placeholder?: string;
    className?: string;
    error?: string;
    onBlur?: () => void;
    onInput?: (title: string) => Promise<void>;
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            InputField: new InputField({ ...props }),
        });
    }
    protected render(): string {
        return template;
    }
}
