import template from './MessageFeed.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { MessageList } from '../MessageList/MessageList';
import './MessageFeed.scss';

export class MessageFeed extends Block {
    constructor() {
        super({
            MessageList: new MessageList(),
            TackButton: new Button({
                text: '+',
                theme: 'background',
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
                    console.log(`message: ${formData.get('message')}`);
                },
            }),
        });
    }

    render() {
        return template;
    }
}
