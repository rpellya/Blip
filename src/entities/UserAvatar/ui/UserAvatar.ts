import Block from 'shared/lib/Block';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import template from './UserAvatar.hbs';
import './UserAvatar.scss';

interface UserAvatarProps {
    iconSrc: string;
    imageSrc?: string;
    className?: string;
    onClick?: () => void;
}

export class UserAvatar extends Block {
    constructor(props: UserAvatarProps) {
        super({
            ...props,
            Avatar: new Avatar({
                imageSrc: props.iconSrc,
                className: props.className ?? '',
            }),
            events: {
                click: () => props.onClick?.(),
            },
        });
    }

    render() {
        return template;
    }
}
