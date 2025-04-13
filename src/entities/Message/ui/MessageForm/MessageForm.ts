import Block from 'app/lib/Block';
import template from './MessageForm.hbs';

interface MessageFormProps {
    formId: string;
    onSubmit: () => void;
}

export class MessageForm extends Block {
    constructor(props: MessageFormProps) {
        super({
            ...props,
            events: {
                keypress: (e: KeyboardEvent) => {
                    if (e.code === 'Enter') {
                        const input = e.target as HTMLInputElement;

                        if (input.value) {
                            props.onSubmit();
                        }
                    }
                },
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    return false;
                },
            },
        });
    }

    render() {
        return template;
    }
}
