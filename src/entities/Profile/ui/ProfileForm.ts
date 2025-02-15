import Handlebars from 'handlebars';
import { Component } from 'shared/lib/Component';
import { Input } from 'shared/ui/Input/Input';
import template from './ProfileForm.hbs';

interface ProfileFormProps {
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export class ProfileForm extends Component<ProfileFormProps> {
    constructor() {
        super('form', {
            email: 'user@example.com',
            login: 'user123',
            firstName: 'Иван',
            lastName: 'Иванов',
            phone: '+7 900 000-00-00'
        });
    }

    render(): string {
        return Handlebars.compile(template)({
            inputs: [
                new Input({ name: 'email', label: 'Почта', value: this.props.email, type: 'email', placeholder: 'pellya@ex.com' }),
                new Input({ name: 'login', label: 'Логин', value: this.props.login, type: 'login', placeholder: 'pellya' }),
                new Input({ name: 'first_name', label: 'Имя', value: this.props.firstName, type: 'name', placeholder: 'Роман' }),
                new Input({ name: 'second_name', label: 'Фамилия', value: this.props.lastName, type: 'name', placeholder: 'Пелля' }),
                new Input({ name: 'phone', label: 'Телефон', value: this.props.phone, type: 'phone', placeholder: '+7 (909) 967 30 30' })
            ].map(input => input.render())
        });
    }

    protected events(): Array<[string, EventListener]> {
        return [];
    }
}