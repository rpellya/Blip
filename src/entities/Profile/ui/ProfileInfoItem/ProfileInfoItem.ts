import Block from 'shared/lib/Block';
import template from './ProfileInfoItem.hbs';
import './ProfileInfoItem.scss';

type ProfileInfoItemProps = {
    label: string;
    data: string;
};

export class ProfileInfoItem extends Block {
    constructor(props: ProfileInfoItemProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
