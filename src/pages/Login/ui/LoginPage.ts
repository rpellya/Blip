import { AuthForm } from 'features/auth';
import Block from 'shared/lib/Block';
import template from './LoginPage.hbs';
import { AppRoutes } from 'app/lib/Router';
import './LoginPage.scss';

export class LoginPage extends Block {
    constructor() {
        super({
            AuthForm: new AuthForm({
                title: 'Blip',
                formId: 'login-form',
                inputs: [
                    {
                        type: 'text',
                        name: 'login',
                        label: 'Логин',
                        inputId: 'login',
                        required: true,
                    },
                    {
                        type: 'password',
                        name: 'password',
                        label: 'Пароль',
                        inputId: 'password',
                        required: true,
                    },
                ],
                submitButton: {
                    text: 'Войти',
                    onClick: () => this.RouterService.go(AppRoutes.CHATS),
                },
                signInButton: {
                    text: 'Нет аккаунта?',
                    onClick: () => this.RouterService.go(AppRoutes.PROFILE),
                },
            }),
        });
    }
    render() {
        return template;
    }
}
