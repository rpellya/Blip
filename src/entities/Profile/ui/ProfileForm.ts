import template from './ProfileForm.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { AppRoutes } from 'app/lib/Router';
import './ProfileForm.scss';

export class ProfileForm extends Block {
    constructor() {
        super({
            inputs: [
                {
                    name: 'avatar',
                    label: 'Аватар',
                    value: 'https://avatars.githubusercontent.com/u/103450915?v=4',
                    type: 'input',
                    placeholder: 'Ссылка',
                },
                {
                    name: 'email',
                    label: 'Почта',
                    value: 'user@example.com',
                    type: 'email',
                    placeholder: 'pellya@ex.com',
                },
                {
                    name: 'login',
                    label: 'Логин',
                    value: 'user123',
                    type: 'login',
                    placeholder: 'pellya',
                },
                {
                    name: 'first_name',
                    label: 'Имя',
                    value: 'Иван',
                    type: 'name',
                    placeholder: 'Роман',
                },
                {
                    name: 'second_name',
                    label: 'Фамилия',
                    value: 'Иванов',
                    type: 'name',
                    placeholder: 'Пелля',
                },
                {
                    name: 'display_name',
                    label: 'Отображаемое имя',
                    value: 'Ванчоус',
                    type: 'name',
                    placeholder: 'Pellya',
                },
                {
                    name: 'phone',
                    label: 'Телефон',
                    value: '+7 900 000-00-00',
                    type: 'phone',
                    placeholder: '+7 900 000-00-00',
                },
                {
                    name: 'oldPassword',
                    label: 'Старый пароль',
                    value: '***',
                    type: 'phone',
                    placeholder: '**********',
                },
                {
                    name: 'newPassword',
                    label: 'Старый пароль',
                    value: '***',
                    type: 'phone',
                    placeholder: '**********',
                },
            ].map((input) => new Input({ ...input, theme: 'outline_bottom' })),
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
