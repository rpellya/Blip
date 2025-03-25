import template from './NotFound.hbs';
import { ErrorPage } from 'widgets/ErrorPage';
import Block from 'shared/lib/Block';
import './NotFoundPage.scss';
import { AppRoutes } from 'app/lib/Router';

export class NotFoundPage extends Block {
    constructor() {
        super({
            errorPage: new ErrorPage({
                textLink: 'Вернуться к чатам',
                code: 404,
                message: 'Страница не найдена',
                route: AppRoutes.MESSANGER,
            }),
        });
    }
    render(): string {
        return template;
    }
}
