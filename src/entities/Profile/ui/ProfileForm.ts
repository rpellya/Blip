import template from './ProfileForm.hbs';
import Block from 'shared/lib/Block';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { AppRoutes } from 'app/lib/Router';
import { profileFormFields } from '../model/types/ProfileFormFields';
import { validate } from 'utils/validate';
import './ProfileForm.scss';

export class ProfileForm extends Block {
    constructor() {
        super({
            inputs: profileFormFields.map(
                (field, index) =>
                    new Input({
                        ...field,
                        theme: 'outline_bottom',
                        onBlur: () => {
                            const input = document.getElementById(
                                field.inputId,
                            ) as HTMLInputElement;
                            const errMessage = validate(
                                field.inputName as string,
                                input.value,
                                true,
                            );
                            const fieldEl = this.lists.AuthFields[
                                index
                            ] as Input;

                            if (errMessage) {
                                fieldEl.setProps({ error: errMessage });
                                return;
                            }
                            fieldEl.setProps({ error: undefined });
                        },
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
