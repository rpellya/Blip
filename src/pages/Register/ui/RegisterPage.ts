import { AuthForm } from 'features/auth/ui/AuthForm/AuthForm';
import Block from 'shared/lib/Block';
import template from './RegisterPage.hbs';
import { AppRoutes } from 'app/lib/Router';

export class RegisterPage extends Block {
    constructor() {
        super({
            AuthForm: new AuthForm({
                formId: 'register-form',
                title: 'Регистрация',
                inputs: [
                    {
                        type: 'email',
                        name: 'email',
                        label: 'Почта',
                        placeholder: 'pellya@ex.com',
                        required: true,
                        inputId: 'email',
                    },
                    {
                        type: 'text',
                        name: 'login',
                        label: 'Логин',
                        placeholder: 'ivan_2010',
                        required: true,
                        inputId: 'login',
                    },
                    {
                        type: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        placeholder: 'Иван',
                        required: true,
                        inputId: 'first_name',
                    },
                    {
                        type: 'text',
                        name: 'second_name',
                        label: 'Фамилия',
                        placeholder: 'Иванов',
                        required: true,
                        inputId: 'second_name',
                    },
                    {
                        type: 'tel',
                        name: 'phone',
                        label: 'Телефон',
                        placeholder: '+7 (909) 967 30 30',
                        required: true,
                        inputId: 'phone',
                    },
                    {
                        type: 'password',
                        name: 'password',
                        label: 'Пароль',
                        required: true,
                        inputId: 'password',
                    },
                    {
                        type: 'newPassword',
                        name: 'newPassword',
                        label: 'Пароль (ещё раз)',
                        required: true,
                        inputId: 'newPassword',
                    },
                ],
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
