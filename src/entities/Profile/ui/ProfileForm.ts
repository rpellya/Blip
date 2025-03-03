import template from './ProfileForm.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { AppRoutes } from 'app/lib/Router';
import { profileFormFields } from '../model/types/ProfileFormFields';
import './ProfileForm.scss';

export class ProfileForm extends Block {
    constructor() {
        super({
            inputs: profileFormFields.map(
                (input) =>
                    new Input({
                        ...input,
                        theme: 'outline_bottom',
                    }),
            ),
            logOutButton: new Button({
                text: 'Выйти',
                theme: 'outline_red',
                onClick: () => this.RouterService.go(AppRoutes.AUTH),
            }),
            saveButton: new Button({
                text: 'Сохранить',
                type: 'submit',
                theme: 'background',
                onClick: () => this.RouterService.go(AppRoutes.CHATS),
            }),
        });
    }

    render(): string {
        return template;
    }
}
