import Router, { AppRoutes } from './lib/Router';
import { MessengerPage } from 'pages/Messenger';
import { LoginPage } from 'pages/Login';
import { NotFoundPage } from 'pages/NotFound';
import { RegisterPage } from 'pages/Register';
import { ProfilePage } from 'pages/Profile';
import { ServerErrorPage } from 'pages/ServerError';
import {
    ProfileEditInfoPage,
    ProfileEditPasswordPage,
} from 'pages/ProfileEdit';

export default class App {
    public readonly router = Router;

    public Render() {
        this.router
            .registerRoute(AppRoutes.AUTH, LoginPage)
            ?.registerRoute(AppRoutes.SIGN_UP, RegisterPage)
            ?.registerRoute(AppRoutes.PROFILE, ProfilePage)
            ?.registerRoute(AppRoutes.MESSANGER, MessengerPage)
            ?.registerRoute(AppRoutes.SETTINGS, ProfileEditInfoPage)
            ?.registerRoute(
                AppRoutes.PASSWORD_SETTINGS,
                ProfileEditPasswordPage,
            )
            ?.registerRoute(AppRoutes.SERVER_ERROR, ServerErrorPage)
            ?.registerRoute(AppRoutes.NOT_FOUND, NotFoundPage)
            ?.start();
    }
}
