import { AuthForm } from 'features/auth';
import Block from 'shared/lib/Block';
import template from './LoginPage.hbs';
import { AppRoutes } from 'app/lib/Router';
import './LoginPage.scss';

const signInFields = [
    {
        label: 'Логин',
        inputName: 'login',
        inputId: 'login',
    },
    {
        label: 'Пароль',
        inputName: 'password',
        inputId: 'password',
        type: 'password',
    },
];

export class LoginPage extends Block {
    constructor() {
        super({
            AuthForm: new AuthForm({
                formType: 'signin',
                title: 'Blip',
                formId: 'login-form',
                AuthFields: signInFields,
                submitButton: {
                    text: 'Войти',
                    onClick: () => this.RouterService.go(AppRoutes.MESSANGER),
                },
                signUpButton: {
                    text: 'Нет аккаунта?',
                    onClick: () => this.RouterService.go(AppRoutes.SIGN_UP),
                },
            }),
        });
    }
    render() {
        return template;
    }
}
