import { PageStrategy } from 'shared/lib/model/PageStrategies';
import { ProfileForm } from 'entities/Profile';
import { AuthLayout } from 'features/auth';

export class ProfilePage implements PageStrategy {
    private profileForm: ProfileForm;
    private layout: AuthLayout;

    constructor() {
        this.layout = new AuthLayout({ type: 'login' }); // просто как пример добавил, надо это вынести в виджет скорее всего и переиспользовать не только для login и register

        this.profileForm = new ProfileForm();

        this.layout.addContent(this.profileForm.render());
    }

    render(appElement: HTMLElement): void {
        appElement.innerHTML = this.layout.render();
    }

    mount(appElement: HTMLElement): void {
        this.profileForm.mount(appElement);
    }

    destroy(): void {
        this.profileForm.destroy();
    }
}
