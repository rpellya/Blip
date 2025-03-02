import template from './MessageFeed.hbs';
import Block from 'shared/lib/Block';
import { MessageList } from '../MessageList/MessageList';
import { MessageHeader } from '../MessageHeader/MessageHeader';
import { MessageFooter } from '../MessageFooter/MessageFooter';
import './MessageFeed.scss';

export class MessageFeed extends Block {
    constructor() {
        super({
            MessageHeader: new MessageHeader(),
            MessageList: new MessageList(),
            MessageFooter: new MessageFooter(),
        });
    }

    render() {
        return template;
    }
}
