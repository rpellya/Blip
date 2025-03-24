import template from './MessengerPage.hbs';
import { MessageFeed } from 'features/Message';
import { ChatList } from 'widgets/Chat';
import { ChatHeader } from 'features/Chat';
import Block from 'shared/lib/Block';
import { AppRoutes } from 'app/lib/Router';
import { MessengerService } from '../model/services/messenger';
import { isSameDate } from 'utils/isSameDate';
import { getDateString, getTimeString } from 'utils/getDateString';
import { MessageItem } from 'entities/Message';
import './MessengerPage.scss';

interface ChatData {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}

interface MessageData {
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    is_read: boolean;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
}

export class MessengerPage extends Block {
    protected chats: ChatData[] = [];
    protected socket: WebSocket | null = null;
    protected selectedChat: MessageData[] = [];

    protected readonly messengerService = new MessengerService();
    protected readonly currentUserId = localStorage.getItem('id');

    protected setChatData(data: MessageData[], title: string) {
        this.selectedChat = data.reverse();
        this.setProps({
            selectedChatTitle: title,
            Messages: this.selectedChat.map((message, idx) => {
                let dateString = '';
                if (
                    idx === 0 ||
                    !isSameDate(message?.time, this.selectedChat[idx - 1]?.time)
                ) {
                    dateString = getDateString(message.time, true);
                }

                return new MessageItem({
                    text: message.content,
                    time: getTimeString(new Date(message.time)),
                    isChecked: message.is_read,
                    isCurrentUser: message.user_id == this.currentUserId,
                    date: dateString && dateString,
                });
            }),
            hasMessages: !!this.selectedChat.length,
        });
    }

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
