import template from './ErrorPage.hbs';
import Block from 'shared/lib/Block';
import './ErrorPage.scss';
import { Button } from 'shared/ui/Button/Button';
import { AppRoutes } from 'app/lib/Router';

export interface ErrorPageProps {
    code: number;
    message: string;
    textLink: string;
    route?: AppRoutes;
}

export class ErrorPage extends Block {
    constructor(props: ErrorPageProps) {
        super({
            ...props,
            NavLink: new Button({
                text: props.textLink,
                theme: 'clear',
                onClick: () =>
                    this.RouterService.go(props.route ?? AppRoutes.MESSENGER),
            }),
        });
    }

    render(): string {
        return template;
    }
}
