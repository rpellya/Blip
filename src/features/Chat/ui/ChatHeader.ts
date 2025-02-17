import Handlebars from 'handlebars';
import template from './ChatHeader.hbs';
import { Link } from 'shared/ui/Link/Link';
import './ChatHeader.scss';

interface ChatHeaderProps {
    textLink: string;
    link: Link;
    placeholderSearch?: string;
    className?: string;
}

export class ChatHeader {
    private props: ChatHeaderProps;

    constructor(props: ChatHeaderProps) {
        this.props = props;
    }

    render(): string {
        return Handlebars.compile(template)({
            ...this.props,
            link: this.props.link.render(),
            // title: this.props.title,
            // inputs: this.props.inputs.map((input) => input.render()),
            // button: this.props.button.render(),
            // link: this.props.link.render(),
        });
    }

    mount(parent: HTMLElement): void {
        this.props.link.mount(parent);
        // this.props.inputs.forEach((input) => input.mount(parent));
        // this.props.button.mount(parent);
    }

    destroy(): void {
        this.props.link.destroy();
        // this.props.inputs.forEach((input) => input.destroy());
        // this.props.button.destroy();
    }
}
