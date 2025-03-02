import Block from 'shared/lib/Block';
import template from './MessageHeader.hbs';
import './MessageHeader.scss';

export class MessageHeader extends Block {
    constructor() {
        super({
            userAvatar: 'Avatar',
            userName: 'Ai',
            menu: 'Menu',
        });
    }

    protected render(): string {
        return template;
    }
}
