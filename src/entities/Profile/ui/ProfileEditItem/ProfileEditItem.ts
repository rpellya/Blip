import Block from 'shared/lib/Block';
import template from './ProfileEditItem.hbs';
import { Input } from 'shared/ui/Input/Input';
import './ProfileEditItem.scss';

interface ProfileEditItemProps {
    label: string;
    value?: string;
    inputName?: string;
    type: string;
    onBlur?: () => void;
}

export class ProfileEditItem extends Block {
    constructor(props: ProfileEditItemProps) {
        super({
            ...props,
            value: props.value,
            fields: new Input({ ...props, theme: 'clear' }),
        });
    }

    render() {
        return template;
    }
}
