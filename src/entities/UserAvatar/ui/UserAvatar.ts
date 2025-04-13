import Block from 'app/lib/Block';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import template from './UserAvatar.hbs';
import pictureFillIcon from 'assets/icons/pictureFill.svg';
import './UserAvatar.scss';

interface UserAvatarProps {
    imageSrc?: string;
    className?: string;
    onClick?: () => void;
}

export class UserAvatar extends Block {
    constructor(props: UserAvatarProps) {
        super({
            ...props,
            Avatar: new Avatar({
                imageSrc: props.imageSrc || pictureFillIcon,
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
