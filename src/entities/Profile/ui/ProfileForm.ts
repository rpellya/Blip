import Handlebars from 'handlebars';
import { Component } from 'shared/lib/Component';
import { Input } from 'shared/ui/Input/Input';
import template from './ProfileForm.hbs';
import './ProfileForm.scss';
import { Button } from 'shared/ui/Button/Button';

interface ProfileFormProps {
    avatar: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    phone: string;
    oldPassword: string;
    newPassword: string;
}

export class ProfileForm extends Component<ProfileFormProps> {
    constructor() {
        super('form', {
            avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
            email: 'user@example.com',
            login: 'user123',
            firstName: 'Иван',
            lastName: 'Иванов',
            phone: '+7 900 000-00-00',
            oldPassword: '***',
            newPassword: '***',
        });
    }

    render(): string {
        return Handlebars.compile(template)({
            inputs: [
                new Input({
                    name: 'avatar',
                    label: 'Аватар',
                    value: this.props.avatar,
                    type: 'input',
                    placeholder: 'Ссылка',
                }),
                new Input({
                    name: 'email',
                    label: 'Почта',
                    value: this.props.email,
                    type: 'email',
                    placeholder: 'pellya@ex.com',
                }),
                new Input({
                    name: 'login',
                    label: 'Логин',
                    value: this.props.login,
                    type: 'login',
                    placeholder: 'pellya',
                }),
                new Input({
                    name: 'first_name',
                    label: 'Имя',
                    value: this.props.firstName,
                    type: 'name',
                    placeholder: 'Роман',
                }),
                new Input({
                    name: 'second_name',
                    label: 'Фамилия',
                    value: this.props.lastName,
                    type: 'name',
                    placeholder: 'Пелля',
                }),
                new Input({
                    name: 'phone',
                    label: 'Телефон',
                    value: this.props.phone,
                    type: 'phone',
                    placeholder: '+7 (909) 967 30 30',
                }),
                new Input({
                    name: 'oldPassword',
                    label: 'Старый пароль',
                    value: this.props.oldPassword,
                    type: 'phone',
                    placeholder: '**********',
                }),
                new Input({
                    name: 'newPassword',
                    label: 'Старый пароль',
                    value: this.props.newPassword,
                    type: 'phone',
                    placeholder: '**********',
                }),
            ].map((input) => input.render()),
            buttons: [
                new Button({
                    text: 'Выйти',
                    theme: 'outline_red',
                    href: '/',
                }),
                new Button({
                    text: 'Сохранить',
                    type: 'submit',
                    theme: 'background',
                    href: '/chat',
                }),
            ].map((button) => button.render()),
        });
    }

    protected events(): Array<[string, EventListener]> {
        return [];
    }
}
