
import Handlebars from 'handlebars';
import { Component } from 'shared/lib/Component';
import template from './ChatList.hbs';
import { ChatCard } from '../ChatCard/ChatCard';
import { Chat } from '../../model/types/schema';
import './ChatList.scss';

export interface ChatListProps {
    chats: Chat[];
}

export class ChatList extends Component {
    private chatCards: ChatCard[] = [];

    constructor(props: ChatListProps) {
        super('div', props);
        this.chatCards = props.chats.map(chat =>
            new ChatCard({ chat })
        );
    }

    render(): string {
        return Handlebars.compile(template)({
            chats: this.chatCards.map(chat => chat.render())
        });
    }

    mount(parent: HTMLElement): void {
        this.chatCards.forEach(chat => chat.mount(parent));
    }

    destroy(): void {
        this.chatCards.forEach(chat => chat.destroy());
    }

    events(): Array<[string, EventListener]> {
        return [];
    }
}