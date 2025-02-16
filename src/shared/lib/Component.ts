export abstract class Component<T = any> {
    protected props: T;
    private element: HTMLElement | null = null;

    constructor(
        protected tagName: string,
        props: T,
    ) {
        this.props = props;
    }

    abstract render(): string;
    protected abstract events(): Array<[string, EventListener]>;

    setProps(newProps: Partial<T>): void {
        this.props = { ...this.props, ...newProps };
        this.updateComponent();
    }

    private updateComponent(): void {
        const newElement = this.createElement();
        if (this.element && newElement) {
            this.element.replaceWith(newElement);
        }
        this.element = newElement;
    }

    private createElement(): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = this.render();
        return div.firstElementChild as HTMLElement;
    }

    mount(parent: HTMLElement): void {
        this.element = this.createElement();
        parent.appendChild(this.element);
        this.events().forEach(([event, listener]) => {
            this.element?.addEventListener(event, listener);
        });
    }

    destroy(): void {
        this.events().forEach(([event, listener]) => {
            this.element?.removeEventListener(event, listener);
        });
    }
}
