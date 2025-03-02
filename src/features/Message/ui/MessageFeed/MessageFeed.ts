import template from './MessageFeed.hbs';
import Block from 'shared/lib/Block';
import './MessageFeed.scss';

export class MessageFeed extends Block {
    constructor() {
        super();
    }

    render() {
        return template;
    }
}
