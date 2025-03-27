import template from './ChatCard.hbs';
import Block from 'shared/lib/Block';
import { UserAvatar } from 'entities/UserAvatar';
import PictureFillIcon from 'assets/icons/PictureFill.svg';
import './ChatCard.scss';

interface ChatCardProps {
    title: string;
    lastMessage?: string;
    last_message?: {
        time: string;
        content: string;
    };
    time: string;
    newMessagesCount?: number;
    avatarIconSrc?: string;
    avatarImageSrc?: string;
    onClick: () => Promise<void>;
}

export class ChatCard extends Block {
    constructor(props: ChatCardProps) {
        console.log(props);

        super({
            ...props,
            time: props.last_message?.time,
            UserAvatar: new UserAvatar({
                className: 'chat-avatar',
                iconSrc: PictureFillIcon,
            }),
            events: { click: props.onClick },
        });
    }

    render(): string {
        return template;
    }
}
