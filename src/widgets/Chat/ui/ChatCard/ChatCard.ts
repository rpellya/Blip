import template from './ChatCard.hbs';
import Block from 'shared/lib/Block';
import './ChatCard.scss';

interface ChatCardProps {
    title: string;
    lastMessage?: string;
    time: string;
    //     isActive?: boolean;
    // className?: string;
    newMessagesCount: number;
    avatarIconSrc?: string;
    avatarImageSrc?: string;
    onClick: () => Promise<void>;
}

export class ChatCard extends Block {
    constructor(props: ChatCardProps) {
        super({
            ...props,
            // className: isActive ? 'chat-card chat-card--active' : 'chat-card',
            events: { click: props.onClick },
        });
    }

    render(): string {
        return template;
    }
}
