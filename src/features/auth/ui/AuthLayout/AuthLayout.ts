import Handlebars from 'handlebars';
import { Component } from 'shared/lib/Component';
import template from './AuthLayout.hbs';
import './AuthLayout.scss'

interface AuthLayoutProps {
    title?: string;
    content?: string;
    type: 'login' | 'register';
}

export class AuthLayout extends Component<AuthLayoutProps> {
    protected events(): Array<[string, EventListener]> {
        throw new Error('Method not implemented.');
    }
    constructor(props: AuthLayoutProps) {
        super('div', props);
    }

    render(): string {
        return Handlebars.compile(template)(this.props);
    }
    private setProps(props: Partial<AuthLayoutProps>): void {
        this.props = { ...this.props, ...props };
        this.render();
    }
    addContent(content: string): void {
        this.setProps({ ...this.props, content });
    }
}