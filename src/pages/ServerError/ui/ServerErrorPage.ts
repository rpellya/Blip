import template from './ServerErrorPage.hbs';
import { ErrorPage } from 'widgets/ErrorPage';
import Block from 'app/lib/Block';
import './ServerErrorPage.scss';

export class ServerErrorPage extends Block {
    constructor() {
        super({
            errorPage: new ErrorPage({
                textLink: 'Вернуться на главную',
                code: 500,
                message: 'Ошибка сервера',
            }),
        });
    }

    render(): string {
        return template;
    }
}
