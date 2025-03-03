import { AuthForm } from 'features/auth/ui/AuthForm/AuthForm';
import Block from 'shared/lib/Block';
import template from './RegisterPage.hbs';
import { AppRoutes } from 'app/lib/Router';

const signUpFields = [
    {
        type: 'email',
        label: 'Почта',
        inputId: 'email',
        inputName: 'email',
        placeholder: 'example@ex.com',
    },
    {
        label: 'Логин',
        inputId: 'login',
        inputName: 'login',
        placeholder: 'example_2004',
    },
    {
        label: 'Имя',
        inputId: 'first_name',
        inputName: 'first_name',
        placeholder: 'Иван',
    },
    {
        label: 'Фамилия',
        inputId: 'second_name',
        inputName: 'second_name',
        placeholder: 'Иванов',
    },
    {
        label: 'Телефон',
        inputId: 'phone',
        inputName: 'phone',
        placeholder: '+7 (952) 752 52 52',
    },
    {
        label: 'Пароль',
        inputId: 'password',
        inputName: 'password',
    },
    {
        label: 'Пароль (ещё раз)',
        inputName: 'password',
        inputId: 'password2',
    },
];

export class RegisterPage extends Block {
    constructor() {
        super({
            AuthForm: new AuthForm({
                formId: 'register-form',
                title: 'Регистрация',
                AuthFields: signUpFields,
                submitButton: {
                    text: 'Зарегистрироваться',
                    onClick: () => this.RouterService.go(AppRoutes.CHATS),
                },
                signInButton: {
                    text: 'Войти',
                    onClick: () => this.RouterService.go(AppRoutes.AUTH),
                },
            }),
        });
    }

    render() {
        return template;
    }
}
