import Block from 'app/lib/Block';
import template from './ProfileEditItem.hbs';
import { Input } from 'shared/ui/Input/Input';
import './ProfileEditItem.scss';

interface ProfileEditItemProps {
    label: string;
    value?: string;
    inputName?: string;
    type: string;
    error?: string;
    onBlur?: () => void;
}

export class ProfileEditItem extends Block {
    constructor(props: ProfileEditItemProps) {
        super({
            ...props,
            value: props.value,
            fields: new Input({
                ...props,
                placeholder: props.value,
                theme: 'clear',
            }),
        });
    }

    render() {
        return template;
    }
}
