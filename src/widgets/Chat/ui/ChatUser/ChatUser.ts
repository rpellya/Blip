import Block from 'shared/lib/Block';
import pictureFillIcon from 'assets/icons/pictureFill.svg';
import { UserAvatar } from 'entities/UserAvatar';
import { Button } from 'shared/ui/Button/Button';
import template from './ChatUser.hbs';
import './ChatUser.scss';

interface ChatUserProps {
    login: string;
    imageSrc?: string;
    onDeleteUser: () => void;
}

export class ChatUser extends Block {
    constructor(props: ChatUserProps) {
        super({
            ...props,
            UserAvatar: new UserAvatar({
                className: props.imageSrc ? 'chat-img-avatar' : 'chat-avatar',
                iconSrc: pictureFillIcon,
                imageSrc: props.imageSrc,
            }),
            DeleteUserButton: new Button({
                className: 'chat-user-delete-button',
                theme: 'outline_red',
                text: 'Удалить',
                onClick: props.onDeleteUser,
            }),
        });
    }

    render() {
        return template;
    }
}
