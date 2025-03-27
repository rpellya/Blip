import Block from 'shared/lib/Block';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import template from './UserAvatar.hbs';
import './UserAvatar.scss';

interface UserAvatarProps {
    iconSrc: string;
    className?: string;
}

export class UserAvatar extends Block {
    constructor(props: UserAvatarProps) {
        super({
            ...props,
            Avatar: new Avatar({
                imageSrc: props.iconSrc,
                className: props.className ?? '',
            }),
        });
    }

    render() {
        return template;
    }
}
