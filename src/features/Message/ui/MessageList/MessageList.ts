import Block from 'shared/lib/Block';
import template from './MessageList.hbs';
import { MessageItem } from 'entities/Message';
import { mockMessages } from '../../model/mock/messages';
import './MessageList.scss';

export class MessageList extends Block {
    constructor() {
        super({
            Messages: mockMessages.map(
                (message) => new MessageItem({ ...message }),
            ),
        });
    }

    render(): string {
        return template;
    }
}
