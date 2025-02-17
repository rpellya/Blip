export interface PageStrategy {
    render(appElement: HTMLElement): void;
    mount(appElement: HTMLElement): void;
    destroy?(): void;
}
