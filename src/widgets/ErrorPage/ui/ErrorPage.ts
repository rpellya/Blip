import Handlebars from 'handlebars';
import template from './ErrorPage.hbs';
import { Component } from 'shared/lib/Component';
import './ErrorPage.scss';

export interface ErrorPageProps {
    code: number;
    message: string;
    textLink: string;
}

export class ErrorPage extends Component<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super('div', {
            code: props.code,
            message: props.message,
            textLink: props.textLink,
        });
    }

    render = (): string => Handlebars.compile(template)(this.props);

    protected events(): Array<[string, EventListener]> {
        return [['click', this.handleClick]];
    }

    private handleClick = (e: Event): void => {
        e.preventDefault();
    };
}
