import { PageStrategy } from 'shared/lib/model/PageStrategies';
import { ProfileForm } from 'entities/Profile';
import template from './ProfilePage.hbs';
import Handlebars from 'handlebars';
import './ProfilePage.scss';

export class ProfilePage implements PageStrategy {
    private profileForm: ProfileForm;

    constructor() {
        this.profileForm = new ProfileForm();
    }

    render(appElement: HTMLElement): void {
        const html = Handlebars.compile(template)({
            profileForm: this.profileForm.render(),
        });
        appElement.innerHTML = html;
    }

    mount(appElement: HTMLElement): void {
        this.profileForm.mount(appElement);
    }

    destroy(): void {
        this.profileForm.destroy();
    }
}
