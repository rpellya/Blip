import Router, { AppRoutes } from './lib/Router';
import { MessengerPage } from 'pages/Messenger';
import { LoginPage } from 'pages/Login';
import { NotFoundPage } from 'pages/NotFound';
import { RegisterPage } from 'pages/Register';
import { EditPasswordPage, ProfilePage } from 'pages/Profile';
import { ServerErrorPage } from 'pages/ServerError';

export default class App {
    public readonly router = Router;

    public Render() {
        this.router
            .registerRoute(AppRoutes.AUTH, LoginPage)
            ?.registerRoute(AppRoutes.SIGN_UP, RegisterPage)
            ?.registerRoute(AppRoutes.PROFILE, ProfilePage)
            ?.registerRoute(AppRoutes.MESSANGER, MessengerPage)
            ?.registerRoute(AppRoutes.PASSWORD_SETTINGS, EditPasswordPage)
            ?.registerRoute(AppRoutes.SERVER_ERROR, ServerErrorPage)
            ?.registerRoute(AppRoutes.NOT_FOUND, NotFoundPage)
            ?.start();
    }
}
