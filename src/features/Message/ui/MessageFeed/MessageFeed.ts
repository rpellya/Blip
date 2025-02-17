import Handlebars from 'handlebars';
import { Component } from 'shared/lib/Component';
import template from './MessageFeed.hbs';
import './MessageFeed.scss';

export class MessageFeed extends Component {
    constructor() {
        super('div', {});
    }

    render() {
        return Handlebars.compile(template)({});
    }

    protected events(): Array<[string, EventListener]> {
        return [];
    }
}
