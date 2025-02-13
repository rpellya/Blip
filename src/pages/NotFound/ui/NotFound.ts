import Handlebars from "handlebars";
import template from "./NotFound.hbs";
import { PageStrategy } from "shared/lib/model/PageStrategies";
import { Link } from "shared/ui/Link/Link";
import './NotFoundPage.scss'

export class NotFoundPage implements PageStrategy {
    private link: Link;

    constructor() {
        this.link = new Link({
            text: "Вернуться на главную",
            href: "/",
            className: "not-found__link"
        });
    }

    render(appElement: HTMLElement): void {
        const context = {
            code: "404",
            message: "Страница не найдена",
            link: this.link.render()
        };

        appElement.innerHTML = Handlebars.compile(template)(context);
        this.link.mount(appElement);
    }

    destroy(): void {
        this.link.destroy();
    }
}