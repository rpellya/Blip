import template from './ChatList.hbs';
import { ChatCard } from '../ChatCard/ChatCard';
import { Chat } from '../../model/types/schema';
import Block from 'shared/lib/Block';
import './ChatList.scss';

const mockChats: Chat[] = [
    {
        id: '3',
        title: 'Мама',
        lastMessage: 'Как дела, сынок?',
        time: '12:10',
        unreadCount: 1,
    },
    {
        id: '2',
        title: 'Васек',
        lastMessage: 'Оле оле! Ливерпуль!',
        time: '12:00',
        unreadCount: 0,
    },
    {
        id: '1',
        title: 'Андрюха',
        lastMessage: 'Вы: Как ты, родной?',
        time: '10:45',
        unreadCount: 2,
    },
];

export class ChatList extends Block {
    constructor() {
        super({
            chatCards: mockChats.map((chat) => new ChatCard({ chat })),
        });
    }

    render(): string {
        return template;
    }
}
