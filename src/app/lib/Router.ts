import Block from 'shared/lib/Block';

export const enum AppRoutes {
    AUTH = '/',
    SIGN_UP = '/sign-up',
    PROFILE = '/profile',
    SERVER_ERROR = '/error-500',
    CHATS = '/chats',

    // last
    NOT_FOUND = '*',
}

type RouteProps = {
    rootQuery: string;
};

const isEqual = (lhs: string, rhs: string) => {
    return rhs === AppRoutes.NOT_FOUND ? true : lhs === rhs;
};

const render = (query: string, block: Block) => {
    const root = document.querySelector(query);

    if (root) {
        root.replaceChildren(block.getContent());

        return root;
    }
};

class Route<BlockClass extends typeof Block> {
    protected _pathname: AppRoutes;
    protected _block: Block | null = null;
    protected _blockClass: BlockClass;
    protected _props: RouteProps;

    constructor(pathname: AppRoutes, view: BlockClass, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    navigate(pathname: AppRoutes) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    match(pathname: AppRoutes) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
        }

        render(this._props.rootQuery, this._block);
    }
}

class Router {
    protected __instance: this | null = null;
    protected _currentRoute: Route<typeof Block> | null = null;
    protected _rootQuery: string | null = null;
    protected AppRoutes: Route<typeof Block>[] = [];

    protected readonly history = window.history;

    constructor(rootQuery: string) {
        if (this.__instance) {
            return this.__instance;
        }

        this.AppRoutes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        this.__instance = this;
    }

    registerRoute(pathname: AppRoutes, block: typeof Block) {
        if (this._rootQuery) {
            const route = new Route(pathname, block, {
                rootQuery: this._rootQuery,
            });
            this.AppRoutes.push(route);

            return this;
        }
    }

    start() {
        window.onpopstate = (e) => {
            const browser = e.currentTarget as Window;
            if (browser) {
                this._onRoute(browser.location.pathname as AppRoutes);
            }
        };

        this._onRoute(window.location.pathname as AppRoutes);
    }

    _onRoute(pathname: AppRoutes) {
        const route = this.getRoute(pathname);

        if (route) {
            this._currentRoute = route;
            route.render();
        }
    }

    go(pathname: AppRoutes) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: AppRoutes) {
        return this.AppRoutes.find((route) => route.match(pathname));
    }

    reassign(pathname: AppRoutes, El: typeof Block) {
        this.AppRoutes = this.AppRoutes.filter(
            (route) => !route.match(pathname),
        );
        this.registerRoute(pathname, El);
    }
}

export default new Router('.page');
