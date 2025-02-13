import { PageStrategy } from "shared/lib/model/PageStrategies";

type Route = {
    path: string;
    strategy: new () => PageStrategy;
};

export class Router {
    private static instance: Router;
    private routes: Route[] = [];
    private currentPage: PageStrategy | null = null;

    private constructor() {
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('DOMContentLoaded', () => this.handleRoute());
        document.addEventListener('click', (e) => this.handleLinkClick(e));
    }

    public static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    }

    public registerRoute(path: string, strategy: new () => PageStrategy): void {
        this.routes.push({ path, strategy });
    }

    private handleRoute(): void {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '*');

        if (route) {
            if (this.currentPage) {
                this.currentPage.destroy?.();
            }

            this.currentPage = new route.strategy();
            const appElement = document.querySelector('.page') as HTMLElement;
            this.currentPage.render(appElement);
        }
    }

    private handleLinkClick(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="/"]');

        if (link) {
            e.preventDefault();
            const href = link.getAttribute('href')!;
            this.navigate(href);
        }
    }

    public navigate(path: string): void {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }
}