import template from './ProfileForm.hbs';
import Block from 'shared/lib/Block';
import { Button } from 'shared/ui/Button/Button';
import { AppRoutes } from 'app/lib/Router';
import { UserAvatar } from 'entities/UserAvatar';
import pictureFillIcon from 'assets/icons/pictureFill.svg';
import { ProfileService } from '../../model/service/profileService';
import { ProfileInfoItem } from '../ProfileInfoItem/ProfileInfoItem';
import { UserData } from '../../model/types/userDataSchema';
import './ProfileForm.scss';

interface ProfileFormProps {
    formId: string;
}

const getProfileInfoItems = (data: UserData) => [
    {
        data: data.email,
        label: 'Почта',
    },
    {
        data: data.login,
        label: 'Логин',
    },
    {
        data: data.first_name,
        label: 'Имя',
    },
    {
        data: data.second_name,
        label: 'Фамилия',
    },
    {
        data: data.display_name,
        label: 'Имя в чате',
    },
    {
        data: data.phone,
        label: 'Телефон',
    },
];

export class ProfileForm extends Block {
    protected readonly profileService = new ProfileService();

    constructor(props: ProfileFormProps) {
        super({
            ...props,
            UserAvatar: new UserAvatar({ iconSrc: pictureFillIcon }),
            EditProfileButton: new Button({
                text: 'Изменить данные',
                theme: 'clear',
                onClick: () => this.RouterService.go(AppRoutes.SETTINGS),
            }),
            EditPassButton: new Button({
                text: 'Изменить пароль',
                theme: 'clear',
                onClick: () =>
                    this.RouterService.go(AppRoutes.PASSWORD_SETTINGS),
            }),
            LogOutButton: new Button({
                text: 'Выйти',
                theme: 'clear',
                onClick: async () => {
                    const result = await this.profileService.LogOut();

                    if (result === 200) {
                        sessionStorage.removeItem('id');
                        this.RouterService.go(AppRoutes.AUTH);
                    }
                },
            }),
            BackButton: new Button({
                text: 'Назад',
                theme: 'background',
                onClick: () => this.RouterService.go(AppRoutes.MESSANGER),
            }),
        });

        setTimeout(async () => {
            const result = await this.profileService.GetUser();

            if (result.status === 200) {
                const data: UserData = JSON.parse(result.response);
                const profileInfoItems = getProfileInfoItems(data);

                this.setProps({
                    userName: data.first_name || `Профиль ${data.login}`,
                    ProfileInfoItems: profileInfoItems.map(
                        (item) => new ProfileInfoItem(item),
                    ),
                });
            } else if (result.status === 401) {
                this.RouterService.go(AppRoutes.AUTH);
            }
        });
    }

    render(): string {
        return template;
    }
}
