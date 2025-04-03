import Block from 'shared/lib/Block';
import template from './SearchInput.hbs';
import './SearchInput.scss';

interface InputProps {
    className?: string;
    onInput: (login: string) => Promise<void>;
}

export class SearchInput extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                input: (e: Event) => {
                    const input = e.target as HTMLInputElement;
                    props.onInput(input.value);
                },
            },
        });
    }

    render() {
        return template;
    }
}
