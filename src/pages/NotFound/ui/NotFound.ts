import template from './NotFound.hbs';
import { ErrorPage } from 'widgets/ErrorPage';
import Block from 'app/lib/Block';
import { AppRoutes } from 'app/lib/Router';
import './NotFoundPage.scss';

export class NotFoundPage extends Block {
    constructor() {
        super({
            errorPage: new ErrorPage({
                textLink: 'Вернуться к чатам',
                code: 404,
                message: 'Страница не найдена',
                route: AppRoutes.MESSENGER,
            }),
        });
    }
    render(): string {
        return template;
    }
}
