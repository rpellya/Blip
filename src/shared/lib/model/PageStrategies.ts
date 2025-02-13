export interface PageStrategy {
    render(appElement: HTMLElement): void;
    destroy?(): void; // Опциональный метод для очистки
    mount?(): void;
}