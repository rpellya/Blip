import template from './MessengerPage.hbs';
import { MessageFeed } from 'features/Message';
import { ChatHeader } from 'features/Chat';
import Block from 'shared/lib/Block';
import { AppRoutes } from 'app/lib/Router';
import { MessengerService } from '../model/services/messenger';
import { isSameDate } from 'utils/isSameDate';
import { getDateString, getTimeString } from 'utils/getDateString';
import { MessageItem } from 'entities/Message';
import { Button } from 'shared/ui/Button/Button';
import { ChatCard } from 'widgets/Chat';
import pictureFillIcon from 'assets/icons/PictureFill.svg';
import { ChatData, MessageData, SearchUserData } from '../model/types/types';
import { SearchInput } from 'shared/ui/SearchInput/SearchInput';
import './MessengerPage.scss';

export class MessengerPage extends Block {
    protected chats: ChatData[] = [];
    protected socket: WebSocket | null = null;
    protected selectedChat: MessageData[] = [];
    protected currentChatId: number | null = null;

    protected readonly messengerService = new MessengerService();
    protected readonly currentUserId = localStorage.getItem('id');

    protected async setChatData(title: string, chatId: number) {
        this.currentChatId = chatId;
        const socket = await this.messengerService.ConnectToChat(chatId);
        if (socket) {
            this.socket = socket;
            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);

                if (Array.isArray(data)) {
                    this.selectedChat = data.reverse();
                    this.setProps({
                        selectedChatTitle: title,
                        Messages: this.selectedChat.map((message, idx) => {
                            let dateString = '';
                            if (
                                idx === 0 ||
                                !isSameDate(
                                    message?.time,
                                    this.selectedChat[idx - 1]?.time,
                                )
                            ) {
                                dateString = getDateString(message.time, true);
                            }

                            return new MessageItem({
                                text: message.content,
                                time: getTimeString(new Date(message.time)),
                                isChecked: message.is_read,
                                isCurrentUser:
                                    message.user_id == this.currentUserId,
                                date: dateString && dateString,
                            });
                        }),
                        hasMessages: !!this.selectedChat.length,
                    });
                } else if (data.type !== 'pong') {
                    this.messengerService.GetChatMessages(socket);
                }
            });
        }
    }

    protected async updateChats() {
        const result = await this.messengerService.GetChats();

        if (result.status === 200) {
            const chats: ChatData[] = JSON.parse(result.response);

            if (chats.length) {
                this.setProps({
                    ChatList: chats.map(
                        (chat) =>
                            new ChatCard({
                                ...chat,
                                lastMessage: chat?.last_message?.content,
                                time: getDateString(chat?.last_message?.time),
                                newMessagesCount: chat?.unread_count,
                                onClick: () =>
                                    this.setChatData(chat.title, chat.id),
                            }),
                    ),
                });
            }
        } else if (result.status === 401) {
            this.RouterService.go(AppRoutes.AUTH);
        }
    }

    constructor() {
        super({
            // MessageFeed: new MessageFeed(),
            ChatHeader: new ChatHeader({
                link: {
                    text: 'Профиль  >',
                    onClick: () => this.RouterService.go(AppRoutes.PROFILE),
                },
                placeholderSearch: 'поиск',
                SearchInput: new SearchInput({
                    className: 'chats-search-input',
                    onInput: async (login) => {
                        if (login.length) {
                            if (this.props.Messages) {
                                this.deleteLists('Messages');
                            }
                            const result =
                                await this.messengerService.GetUsersByLogin(
                                    login,
                                );

                            if (!this.chats.length) {
                                const chatsResult =
                                    await this.messengerService.GetChats();

                                if (chatsResult.status === 200) {
                                    this.chats = JSON.parse(
                                        chatsResult.response,
                                    );
                                    console.log('1');
                                }
                                console.log(JSON.parse(chatsResult.response));
                            }

                            if (result.status === 200) {
                                const data: SearchUserData[] = JSON.parse(
                                    result.response,
                                );

                                this.deleteLists('ChatList');

                                this.setProps({
                                    SearchChatList: data.map(
                                        (user) =>
                                            new ChatCard({
                                                title: user.login,
                                                lastMessage: `${user.first_name} ${user.second_name}`,
                                                time: '',
                                                newMessagesCount: 0,
                                                avatarIconSrc: pictureFillIcon,
                                                avatarImageSrc: user.avatar,
                                                onClick: async () => {
                                                    const result =
                                                        await this.messengerService.PostChat(
                                                            user.login,
                                                            user.id,
                                                        );

                                                    if (result) {
                                                        this.deleteLists(
                                                            'Users',
                                                        );
                                                        this.updateChats();
                                                        this.setProps({
                                                            selectedChatTitle:
                                                                user.login,
                                                            hasMessages: false,
                                                            isSearchUsers:
                                                                false,
                                                        });

                                                        const chatId =
                                                            JSON.parse(
                                                                result,
                                                            ).id;
                                                        this.setChatData(
                                                            user.login,
                                                            chatId,
                                                        );
                                                    }
                                                },
                                            }),
                                    ),
                                });
                            }
                            return;
                        }
                        this.deleteLists('SearchChatList');
                        this.updateChats();
                    },
                }),
            }),
            ButtonToProfile: new Button({
                text: 'Профиль',
                className: 'chats-button-to-profile',
                onClick: () => this.RouterService.go(AppRoutes.PROFILE),
            }),
            SendButton: new Button({
                text: 'Отправить',
                className: 'chat-message-send-button',
                onClick: () => {
                    const form = document.getElementById(
                        'messageForm',
                    ) as HTMLFormElement;
                    const formData = new FormData(form);

                    if (this.socket) {
                        this.socket.send(
                            JSON.stringify({
                                content: formData.get('message'),
                                type: 'message',
                            }),
                        );
                        this.messengerService.GetChatMessages(this.socket);
                    }
                },
            }),
            formId: 'messageForm',
        });

        setTimeout(async () => this.updateChats());
    }

    render(): string {
        return template;
    }
}
