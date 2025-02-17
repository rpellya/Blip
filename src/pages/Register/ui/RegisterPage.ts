import { AuthForm } from 'features/auth/ui/AuthForm/AuthForm';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Link } from 'shared/ui/Link/Link';
import { PageStrategy } from 'shared/lib/model/PageStrategies';
import { AuthLayout } from 'features/auth';

export class RegisterPage implements PageStrategy {
    private layout: AuthLayout;
    private authForm: AuthForm;

    constructor() {
        this.layout = new AuthLayout({ type: 'register' });

        this.authForm = new AuthForm({
            formId: 'register-form',
            title: 'Регистрация',
            inputs: [
                new Input({
                    type: 'email',
                    name: 'email',
                    label: 'Почта',
                    placeholder: 'pellya@ex.com',
                    required: true,
                }),
                new Input({
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    placeholder: 'ivan_2010',
                    required: true,
                }),
                new Input({
                    type: 'text',
                    name: 'first_name',
                    label: 'Имя',
                    placeholder: 'Иван',
                    required: true,
                }),
                new Input({
                    type: 'text',
                    name: 'second_name',
                    label: 'Фамилия',
                    placeholder: 'Иванов',
                    required: true,
                }),
                new Input({
                    type: 'tel',
                    name: 'phone',
                    label: 'Телефон',
                    placeholder: '+7 (909) 967 30 30',
                    required: true,
                }),
                new Input({
                    type: 'password',
                    name: 'password',
                    label: 'Пароль',
                    required: true,
                }),
                new Input({
                    type: 'newPassword',
                    name: 'newPassword',
                    label: 'Пароль (ещё раз)',
                    required: true,
                }),
            ],
            button: new Button({
                type: 'submit',
                text: 'Зарегистрироваться',
                theme: 'background',
            }),
            link: new Link({
                text: 'Войти',
                href: '/sign-in',
                className: 'auth-link',
            }),
        });

        this.layout.addContent(this.authForm.render());
    }

    render(appElement: HTMLElement): void {
        appElement.innerHTML = this.layout.render();
        this.authForm.mount(appElement);
    }

    mount(appElement: HTMLElement): void {
        this.authForm.mount(appElement);
    }

    destroy(): void {
        this.authForm.destroy();
    }
}
