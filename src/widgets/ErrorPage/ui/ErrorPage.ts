import template from './ErrorPage.hbs';
import Block from 'shared/lib/Block';
import './ErrorPage.scss';

export interface ErrorPageProps {
    code: number;
    message: string;
    textLink: string;
}

export class ErrorPage extends Block {
    constructor(props: ErrorPageProps) {
        super({
            code: props.code,
            message: props.message,
            textLink: props.textLink,
        });
    }

    render(): string {
        return template;
    }
}
