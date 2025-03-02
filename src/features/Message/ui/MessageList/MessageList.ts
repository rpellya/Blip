import Block from 'shared/lib/Block';
import template from './MessageList.hbs';
import { Message, MessageItem } from 'entities/Message';
import './MessageList.scss';

const messages: Message[] = [
    {
        text: 'Hello world!',
        time: '11:00',
        isCurrentUser: false,
    },
    {
        text: 'Hi!',
        time: '11:05',
        isCurrentUser: true,
        isCheked: true,
    },
];

export class MessageList extends Block {
    constructor() {
        super({
            Messages: messages.map((message) => new MessageItem({ message })),
        });
    }

    render(): string {
        return template;
    }
}
