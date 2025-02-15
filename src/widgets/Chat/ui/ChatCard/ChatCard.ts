import Handlebars from 'handlebars';
import { Component } from 'shared/lib/Component';
import template from './ChatCard.hbs';
import { Chat } from '../../model/types/schema';
import './ChatCard.scss'

export interface ChatCardProps {
    chat: Chat;
    isActive?: boolean;
    className?: string;
}

export class ChatCard extends Component<ChatCardProps> {
    constructor(props: ChatCardProps) {
        const { chat, isActive } = props;

        super('div', {
            ...props,
            ...chat,
            className: isActive ? 'chat-card chat-card--active' : 'chat-card'
        });
    }

    render = (): string => Handlebars.compile(template)(this.props);

    getChatId = (): string => this.props.chat.id;

    setActive(isActive: boolean): void {
        this.setProps({
            ...this.props,
            isActive
        });
    }

    protected events(): Array<[string, EventListener]> {
        return [
            ['click', this.handleClick]
        ];
    }

    private handleClick = (e: Event): void => {
        e.preventDefault();

        console.log('Selected chat:', this.props.chat.id);
    };
}