import Block from 'shared/lib/Block';
import template from './MessageItem.hbs';
import { Message } from '../../model/types/MessageSchema';
import './MessageItem.scss';

interface MessageItemProps {
    message: Message;
}

export class MessageItem extends Block {
    constructor({ message }: MessageItemProps) {
        super({ ...message });
    }

    render(): string {
        return template;
    }
}
