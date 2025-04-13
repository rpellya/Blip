import Block from 'app/lib/Block';
import template from './Avatar.hbs';
import './Avatar.scss';

interface AvatarProps {
    imageSrc: string;
    className: string;
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
