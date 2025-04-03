import template from './ChatCard.hbs';
import Block from 'shared/lib/Block';
import { UserAvatar } from 'entities/UserAvatar';
import './ChatCard.scss';

interface ChatCardProps {
    userName: string;
    message: string;
    time: string;
    newMessagesCount: number;
    avatarIconSrc: string;
    avatarImageSrc?: string;
    onClick: () => Promise<void>;
}

export class ChatCard extends Block {
    constructor(props: ChatCardProps) {
        super({
            ...props,
            UserAvatar: new UserAvatar({
                className: 'chat-avatar',
                iconSrc: props.avatarIconSrc,
                imageSrc: props.avatarImageSrc,
            }),
            events: { click: props.onClick },
        });
    }

    render(): string {
        return template;
    }
}
