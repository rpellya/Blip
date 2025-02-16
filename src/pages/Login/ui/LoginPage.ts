import { PageStrategy } from 'shared/lib/model/PageStrategies';
import { AuthLayout } from 'features/auth';
import { AuthForm } from 'features/auth';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Link } from 'shared/ui/Link/Link';

export class LoginPage implements PageStrategy {
    private layout: AuthLayout;
    private authForm: AuthForm;

    constructor() {
        this.layout = new AuthLayout({ type: 'login' });

        this.authForm = new AuthForm({
            title: 'Blip',
            inputs: [
                new Input({
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    required: true,
                }),
                new Input({
                    type: 'password',
                    name: 'password',
                    label: 'Пароль',
                    required: true,
                }),
            ],
            button: new Button({
                type: 'submit',
                text: 'Авторизоваться',
                theme: 'background',
                href: '/chat',
            }),
            link: new Link({ text: 'Нет аккаунта?', href: '/sign-up' }),
            formId: 'login-form',
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
