import Block from 'shared/lib/Block';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import template from './MessageFooter.hbs';
import './MessageFooter.scss';

export class MessageFooter extends Block {
    constructor() {
        super({
            formId: 'messageForm',
            TackButton: new Button({
                text: '+',
                theme: 'clear',
                className: 'message-tack-button',
            }),
            Input: new Input({
                className: 'message-input',
                placeholder: 'Сообщение',
                name: 'message',
            }),
            SendButton: new Button({
                text: '->',
                theme: 'background',
                className: 'message-send-button',
                onClick: () => {
                    const form = document.getElementById(
                        'messageForm',
                    ) as HTMLFormElement;
                    const formData = new FormData(form);
                    const message = formData.get('message');
                    if (message ?? '') {
                        console.log(`message: ${message}`);
                    }
                },
            }),
        });
    }
    render() {
        return template;
    }
}
