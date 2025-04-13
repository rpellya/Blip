import Block from 'app/lib/Block';
import template from './InputField.hbs';
import { InputProps } from './Input';

export class InputField extends Block {
    constructor(props: Partial<InputProps>) {
        super({
            ...props,
            theme: props.theme || 'default',
            type: props.type || 'text',
            events: {
                blur: () => {
                    props?.onBlur?.();
                },
            },
        });
    }

    render(): string {
        return template;
    }
}
