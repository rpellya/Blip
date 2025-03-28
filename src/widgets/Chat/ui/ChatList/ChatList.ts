import template from './ChatList.hbs';
import Block from 'shared/lib/Block';
import './ChatList.scss';

export class ChatList extends Block {
    render(): string {
        return template;
    }
}
