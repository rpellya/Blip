import template from './ChatCard.hbs';
import { Chat } from '../../model/types/schema';
import Block from 'shared/lib/Block';
import './ChatCard.scss';

export interface ChatCardProps {
    chat: Chat;
    isActive?: boolean;
    className?: string;
    onBlur?: () => void;
}

export class ChatCard extends Block {
    constructor(props: ChatCardProps) {
        const { chat, isActive, onBlur } = props;

        super({
            ...chat,
            className: isActive ? 'chat-card chat-card--active' : 'chat-card',
            events: { blur: () => onBlur?.() },
        });
    }

    render(): string {
        return template;
    }
}
