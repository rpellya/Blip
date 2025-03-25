import Block from 'shared/lib/Block';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import template from './UserAvatar.hbs';

type UserAvatarProps = {
    iconSrc: string;
    imageSrc?: string;
    className?: string;
};

export class UserAvatar extends Block {
    constructor(props: UserAvatarProps) {
        super({
            ...props,
            Avatar: new Avatar({
                imageSrc: props.imageSrc ? props.imageSrc : props.iconSrc,
                className: props.className ?? '',
            }),
        });
    }

    render() {
        return template;
    }
}
