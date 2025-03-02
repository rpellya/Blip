import { ProfileForm } from 'entities/Profile';
import template from './ProfilePage.hbs';
import Block from 'shared/lib/Block';
import './ProfilePage.scss';

export class ProfilePage extends Block {
    constructor() {
        super({ profileForm: new ProfileForm() });
    }

    render(): string {
        return template;
    }
}
