import Handlebars from 'handlebars';
import template from './ServerErrorPage.hbs';
import { PageStrategy } from 'shared/lib/model/PageStrategies';
import { ErrorPage } from 'widgets/ErrorPage';
import './ServerErrorPage.scss';

export class ServerErrorPage implements PageStrategy {
    private errorPage: ErrorPage;

    constructor() {
        this.errorPage = new ErrorPage({
            textLink: 'Вернуться на главную',
            code: 500,
            message: 'Ошибка сервера',
        });
    }

    render(appElement: HTMLElement): void {
        appElement.innerHTML = Handlebars.compile(template)({
            erroPage: this.errorPage.render(),
        });
    }

    mount(appElement: HTMLElement): void {
        this.errorPage.mount(appElement);
    }

    destroy(): void {
        this.errorPage.destroy();
    }
}
