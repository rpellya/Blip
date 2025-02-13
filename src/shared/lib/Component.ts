import Handlebars from 'handlebars';

export abstract class Component<T = any> {
    protected props: T;
    private _template: Handlebars.TemplateDelegate<T>;

    constructor(template: string, props: T) {
        this._template = Handlebars.compile(template);
        this.props = props;
    }

    render(): string {
        return this._template(this.props);
    }

    protected abstract events(): Array<[string, EventListener]>;

    mount(element: HTMLElement): void {
        element.innerHTML = this.render();
        this.events().forEach(([event, listener]) => {
            element.addEventListener(event, listener);
        });
    }
}