import Handlebars from 'handlebars';
import template from './Link.hbs';
import { Router } from 'app/lib/Router';
import './Link.scss';

interface LinkProps {
    href: string;
    text: string;
    className?: string;
}

export class Link {
    private props: LinkProps;
    private router: Router;
    private element: HTMLAnchorElement | null = null;

    constructor(props: LinkProps) {
        this.props = props;
        this.router = Router.getInstance();
    }

    render(): string {
        return Handlebars.compile(template)({
            ...this.props,
            handleClick: this.handleClick.bind(this),
        });
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        this.router.navigate(this.props.href);
    }

    mount(parent: HTMLElement): void {
        this.element = parent.querySelector(`a[href="${this.props.href}"]`);
        if (this.element) {
            this.element.addEventListener('click', this.handleClick.bind(this));
        }
    }

    destroy(): void {
        if (this.element) {
            this.element.removeEventListener('click', this.handleClick);
            this.element = null;
        }
    }
}
