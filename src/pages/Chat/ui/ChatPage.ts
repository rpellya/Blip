import template from './ChatPage.hbs';
import { MessageFeed } from 'features/Message';
import { ChatList } from 'widgets/Chat';
import { ChatHeader } from 'features/Chat';
import Block from 'shared/lib/Block';
import { AppRoutes } from 'app/lib/Router';
import './ChatPage.scss';

export class ChatPage extends Block {
    constructor() {
        super({
            messageFeed: new MessageFeed(),
            chatList: new ChatList(),
            chatHeader: new ChatHeader({
                link: {
                    text: 'Профиль  >',
                    onClick: () => this.RouterService.go(AppRoutes.PROFILE),
                },
                placeholderSearch: 'поиск',
            }),
        });
    }

    render(): string {
        return template;
    }
}
