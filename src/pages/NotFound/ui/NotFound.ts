import template from './NotFound.hbs';
import { ErrorPage } from 'widgets/ErrorPage';
import Block from 'shared/lib/Block';
import './NotFoundPage.scss';

export class NotFoundPage extends Block {
    constructor() {
        super({
            errorPage: new ErrorPage({
                textLink: 'Вернуться на главную',
                code: 404,
                message: 'Страница не найдена',
            }),
        });
    }
    render(): string {
        return template;
    }
}
