import Block from 'shared/lib/Block';
import template from './MessageItem.hbs';
import currentUserTemplate from './CurrentMessageItem.hbs';
import { Message } from '../../model/types/MessageSchema';
// import './MessageItem.scss';

export class MessageItem extends Block {
    constructor({ ...message }: Message) {
        super({ ...message });
    }

    override render() {
        if (this.props.isCurrentUser) {
            return currentUserTemplate;
        }

        return template;
    }
}
