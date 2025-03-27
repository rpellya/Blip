import Block from 'shared/lib/Block';
import template from './MessageHeader.hbs';
import { UserAvatar } from 'entities/UserAvatar';
import pictureFillIcon from 'assets/icons/PictureFill.svg';
import './MessageHeader.scss';

export class MessageHeader extends Block {
    constructor() {
        super({
            UserAvatar: new UserAvatar({ iconSrc: pictureFillIcon }),
        });
    }

    render(): string {
        return template;
    }
}
