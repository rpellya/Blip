import Block from 'shared/lib/Block';
import template from './ChatHeader.hbs';
import { AppRoutes } from 'app/lib/Router';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { SearchInput } from 'shared/ui/SearchInput/SearchInput';
import './ChatHeader.scss';

interface ChatHeaderProps {
    link: {
        text: string;
        onClick: () => void;
    };
    placeholderSearch?: string;
    className?: string;
    SearchInput?: SearchInput;
}

export class ChatHeader extends Block {
    constructor(props: ChatHeaderProps) {
        super({
            ...props,
            link: new Button({
                ...props,
                theme: 'clear',
                text: props.link.text,
                onClick: () => this.RouterService.go(AppRoutes.PROFILE),
            }),
            // searchBar: new Input({
            //     className: 'searchBar',
            //     placeholder: props.placeholderSearch,
            //     type: 'search',
            //     inputName: 'search',
            //     label: '',
            // }),
        });
    }

    render(): string {
        return template;
    }
}
