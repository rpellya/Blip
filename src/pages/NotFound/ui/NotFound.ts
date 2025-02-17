import Handlebars from 'handlebars';
import template from './NotFound.hbs';
import { PageStrategy } from 'shared/lib/model/PageStrategies';
import { ErrorPage } from 'widgets/ErrorPage';
import './NotFoundPage.scss';

export class NotFoundPage implements PageStrategy {
    private erroPage: ErrorPage;

    constructor() {
        this.erroPage = new ErrorPage({
            textLink: 'Вернуться на главную',
            code: 404,
            message: 'Страница не найдена',
        });
    }

    render(appElement: HTMLElement): void {
        appElement.innerHTML = Handlebars.compile(template)({
            erroPage: this.erroPage.render(),
        });
    }

    mount(appElement: HTMLElement): void {
        this.erroPage.mount(appElement);
    }

    destroy(): void {
        this.erroPage.destroy();
    }
}
