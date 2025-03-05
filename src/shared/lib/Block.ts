import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';
import Router from 'app/lib/Router';

export type BlockProps = {
    [key: string]: unknown;
};

const enum Events {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

export default class Block {
    public readonly RouterService = Router;

    protected _element: HTMLElement | null = null;
    protected _id: number = Math.floor(100000 + Math.random() * 999999);
    protected props: BlockProps;
    protected children: Record<string, Block>;
    protected lists: Record<string, unknown[]>;

    protected eventBus: () => EventBus;

    constructor(propsWithChildren: BlockProps = {}) {
        const eventBus = new EventBus();
        const { props, children, lists } =
            this._getChildrenPropsAndProps(propsWithChildren);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Events.INIT);
    }

    private _addEvents(): void {
        const events = this.props.events as Record<
            string,
            EventListenerOrEventListenerObject
        >;

        if (!events) return;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Events.INIT, this.init.bind(this) as EventCallback);
        eventBus.on(
            Events.FLOW_CDM,
            this._componentDidMount.bind(this) as EventCallback,
        );
        eventBus.on(
            Events.FLOW_CDU,
            this._componentDidUpdate.bind(this) as EventCallback,
        );
        eventBus.on(
            Events.FLOW_RENDER,
            this._render.bind(this) as EventCallback,
        );
    }

    public _removeEvents(): void {
        const events = this.props.events as Record<
            string,
            EventListenerOrEventListenerObject
        >;

        if (!events) return;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                this._element.removeEventListener(eventName, events[eventName]);
            }
        });
    }

    protected init(): void {
        this.eventBus().emit(Events.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Events.FLOW_CDM);
    }

    private _componentDidUpdate(/*oldProps: BlockProps, newProps: BlockProps*/): void {
        const response = this.componentDidUpdate(/*oldProps, newProps*/);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(/*oldProps: BlockProps, newProps: BlockProps*/): boolean {
        return true;
    }

    private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
        children: Record<string, Block>;
        props: BlockProps;
        lists: Record<string, unknown[]>;
    } {
        const children: Record<string, Block> = {};
        const props: BlockProps = {};
        const lists: Record<string, unknown[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    protected addAttributes(): void {
        const attr = this.props.attr as Record<string, unknown>;

        if (!attr) return;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string);
            }
        });
    }

    public setProps = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const shouldRemoveEvents = Boolean(this._element);

        if (shouldRemoveEvents) {
            this._removeEvents();
        }

        const propsAndStubs = { ...this.props };
        const _tmpId = Math.floor(100000 + Math.random() * 900000);
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child._id}"]`,
            );
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template');
            child.forEach((item) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(
                `[data-id="__l_${_tmpId}"]`,
            );
            if (stub) {
                stub.replaceWith(listCont.content);
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    protected render(): string {
        return '';
    }

    public getContent(): HTMLElement {
        if (!this._element) {
            throw new Error('Element is not created');
        }
        return this._element;
    }

    private _makePropsProxy(props: BlockProps): BlockProps {
        const eventBusBinded = () => this.eventBus();

        return new Proxy(props, {
            get(target: BlockProps, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: BlockProps, prop: string, value: unknown) {
                const oldTarget = { ...target };
                target[prop] = value;
                eventBusBinded().emit(Events.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }
}
