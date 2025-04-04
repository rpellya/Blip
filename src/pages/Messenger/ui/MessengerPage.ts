import template from './MessengerPage.hbs';
import Block from 'shared/lib/Block';
import { AppRoutes } from 'app/lib/Router';
import { MessengerService } from '../model/services/messenger';
import { isSameDate } from 'utils/isSameDate';
import { getDateString, getTimeString } from 'utils/getDateString';
import { Button } from 'shared/ui/Button/Button';
import { ChatCard, ChatUser } from 'widgets/Chat';
import addIcon from 'assets/icons/add.svg';
import pictureFillIcon from 'assets/icons/pictureFill.svg';
import arrowRightSendIcon from 'assets/icons/arrowRightSend.svg';
import arrowRightIcon from 'assets/icons/arrowRight.svg';
import paperClipIcon from 'assets/icons/paperClip.svg';
import deleteIcon from 'assets/icons/trash.svg';
import closeIcon from 'assets/icons/close.svg';
import userIcon from 'assets/icons/user.svg';
import {
    ChatData,
    ChatUser as ChatUserType,
    MessageData,
} from '../model/types/types';
import { SearchInput } from 'shared/ui/SearchInput/SearchInput';
import { UserAvatar } from 'entities/UserAvatar';
import { Input } from 'shared/ui/Input/Input';
import { getAvatarSrc } from 'utils/getEndPoint';
import { MessageForm, MessageItem } from 'entities/Message';
import { ProfileService } from 'entities/Profile';
import { validate } from 'utils/validate';
import './MessengerPage.scss';

export class MessengerPage extends Block {
    protected chats: ChatData[] = [];
    protected socket: WebSocket | null = null;
    protected selectedChat: MessageData[] = [];
    protected currentChatId: number | null = null;
    protected currentUserId: number | null = null;

    protected readonly messengerService = new MessengerService();
    protected readonly profileService = new ProfileService();

    protected closeModal = () => {
        this.setProps({
            isModalOpen: false,
        });
        this.deleteLists('ModalContent');
    };

    protected setChats(chats: ChatData[]) {
        if (chats.length) {
            this.setProps({
                ChatList: chats.map(
                    (chat) =>
                        new ChatCard({
                            userName: chat.title,
                            message: chat?.last_message?.content,
                            time: getDateString(chat?.last_message?.time),
                            newMessagesCount: chat?.unread_count,
                            avatarIconSrc: pictureFillIcon,
                            avatarImageSrc: getAvatarSrc(chat.avatar),
                            onClick: () =>
                                this.setChatData(
                                    chat.title,
                                    chat.id,
                                    chat.avatar,
                                ),
                        }),
                ),
            });
        }
    }

    protected async setChatData(
        title: string,
        chatId: number,
        chatImg?: string,
    ) {
        this.currentChatId = chatId;
        this.setProps({
            selectedChatTitle: title,
            ChatAvatar: new UserAvatar({
                iconSrc: pictureFillIcon,
                className: chatImg ? 'full-chat-img-avatar' : 'chat-avatar',
                imageSrc: getAvatarSrc(chatImg),
            }),
        });
        if (!this.currentUserId) {
            return;
        }

        const socket = await this.messengerService.ConnectToChat(
            chatId,
            this.currentUserId,
        );

        if (socket) {
            this.socket = socket;
            socket.addEventListener('message', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (Array.isArray(data)) {
                        this.selectedChat = data.reverse();
                        this.setProps({
                            Messages: this.selectedChat.map((message, idx) => {
                                let dateString = '';
                                if (
                                    idx === 0 ||
                                    !isSameDate(
                                        message?.time,
                                        this.selectedChat[idx - 1]?.time,
                                    )
                                ) {
                                    dateString = getDateString(
                                        message.time,
                                        true,
                                    );
                                }
                                return new MessageItem({
                                    text: message.content,
                                    time: getTimeString(new Date(message.time)),
                                    isChecked: message.is_read,
                                    isCurrentUser:
                                        message.user_id == this.currentUserId,
                                    date: dateString,
                                });
                            }),
                            hasMessages: !!this.selectedChat.length,
                        });
                        this.scrollToLastMessage();
                    } else if (data.type !== 'pong') {
                        this.messengerService.GetChatMessages(socket);
                        this.scrollToLastMessage();
                    }
                } catch (e) {
                    this.profileService.LogOut();
                    this.RouterService.go(AppRoutes.AUTH);
                    this.RouterService.go(AppRoutes.AUTH);
                    this.RouterService.reassign(
                        AppRoutes.MESSENGER,
                        MessengerPage,
                    );
                    console.log(e);
                }
            });
        }
    }

    protected async updateChats() {
        const result = await this.messengerService.GetChats();

        if (result?.status === 200) {
            this.chats = JSON.parse(result.response);
            this.setChats(this.chats);
        } else if (result?.status === 401) {
            this.RouterService.go(AppRoutes.AUTH);
        }
    }

    protected async updateChatUsers() {
        const response = await this.messengerService.GetChatsUsers(
            this.currentChatId!,
        );

        if (response?.status === 200) {
            const users = JSON.parse(response.response) as ChatUserType[];
            this.setProps({
                ModalContent: users.map(
                    (user) =>
                        new ChatUser({
                            login: user.login,
                            imageSrc: getAvatarSrc(user.avatar),
                            onDeleteUser: async () => {
                                await this.messengerService.DeleteUserFromChat(
                                    this.currentChatId!,
                                    user.id,
                                );
                                this.updateChatUsers();
                            },
                        }),
                ),
            });
        }
    }

    protected sendMessage() {
        const form = document.getElementById('messageForm') as HTMLFormElement;
        const formData = new FormData(form);
        const input = document.getElementById('message') as HTMLFormElement;
        const message = formData.get('message') as string;

        if (!validate('message', message)) {
            return;
        }

        if (this.socket) {
            this.socket.send(
                JSON.stringify({
                    content: message,
                    type: 'message',
                }),
            );
            input.value = '';

            this.messengerService.GetChatMessages(this.socket);
            this.scrollToLastMessage();
        }
    }

    protected scrollToLastMessage() {
        const chatContainer = document.getElementById('chat-history-container');
        console.log(chatContainer);
        if (chatContainer && chatContainer.lastElementChild) {
            chatContainer.lastElementChild.scrollIntoView();
        }
    }
    constructor() {
        super({
            AddNewChatButton: new Button({
                className: 'button__new_chat',
                theme: 'clear',
                iconSrc: addIcon,
                onClick: () => {
                    this.setProps({
                        isModalOpen: true,
                        modalTitle: 'Создание нового чата',
                        ModalContent: new Input({
                            label: 'Название чата',
                            inputName: 'chatName',
                            inputId: 'chatName',
                            theme: 'outline_bottom',
                        }),
                        ModalSubmitButton: new Button({
                            text: 'Создать',
                            theme: 'background',
                            onClick: async () => {
                                const input = document.getElementById(
                                    'chatName',
                                ) as HTMLInputElement;
                                const result =
                                    await this.messengerService.PostChat(
                                        input.value,
                                    );

                                if (result?.status === 200) {
                                    this.deleteLists('Messages');
                                    this.setProps({
                                        selectedChatTitle: undefined,
                                    });
                                    await this.updateChats();
                                    this.closeModal();
                                }
                            },
                        }),
                    });
                },
            }),
            ButtonToProfile: new Button({
                text: 'Профиль',
                className: 'button__to_profile',
                theme: 'icon',
                iconSrc: arrowRightIcon,
                onClick: () => this.RouterService.go(AppRoutes.PROFILE),
            }),
            SearchInput: new SearchInput({
                onInput: async (title) => {
                    if (title) {
                        setTimeout(() => {
                            const filteredChats = this.chats.filter((chat) =>
                                chat.title
                                    .toLowerCase()
                                    .includes(title.toLowerCase()),
                            );
                            this.setChats(filteredChats);
                        }, 800);

                        return;
                    }
                    this.setChats(this.chats);
                },
            }),
            UsersButton: new Button({
                iconSrc: userIcon,
                onClick: async () => {
                    this.deleteChilds('ModalContent');
                    this.updateChatUsers();
                    this.setProps({
                        isModalOpen: true,
                        modalTitle: 'Пользователи',
                        ModalSubmitButton: new Button({
                            text: 'Добавить пользователя',
                            theme: 'background',
                            className: 'modal-button',
                            onClick: () => {
                                this.deleteLists('ModalContent');
                                this.setProps({
                                    modalTitle: 'Добавление пользователя',
                                    ModalContent: new Input({
                                        label: 'Логин',
                                        theme: 'outline_bottom',
                                        inputName: 'login',
                                        inputId: 'login',
                                    }),
                                    ModalSubmitButton: new Button({
                                        text: 'Добавить',
                                        theme: 'background',
                                        className: 'modal-button',
                                        onClick: async () => {
                                            const input =
                                                document.getElementById(
                                                    'login',
                                                ) as HTMLInputElement;
                                            const responseResult =
                                                await this.messengerService.GetUsersByLogin(
                                                    input.value,
                                                );

                                            if (
                                                responseResult?.status ===
                                                    200 &&
                                                this.currentChatId
                                            ) {
                                                const data = JSON.parse(
                                                    responseResult?.response,
                                                );
                                                this.messengerService.AddUserToChat(
                                                    data[0].id,
                                                    this.currentChatId,
                                                );
                                                this.closeModal();
                                            }
                                        },
                                    }),
                                });
                            },
                        }),
                    });
                },
            }),
            DeleteChatButton: new Button({
                iconSrc: deleteIcon,
                iconAlt: 'Удалить',
                theme: 'clear',
                className: 'button__delete_chat',
                onClick: async () => {
                    if (this.currentChatId) {
                        const result =
                            await this.messengerService.DeleteChatById(
                                this.currentChatId,
                            );

                        if (result?.status === 200) {
                            this.setProps({
                                selectedChatTitle: undefined,
                            });
                            this.updateChats();
                        }
                    }
                },
            }),
            ModalCloseButton: new Button({
                className: 'modal-close-button',
                iconSrc: closeIcon,
                theme: 'clear',
                onClick: () => this.closeModal(),
            }),
            TackButton: new Button({
                iconSrc: paperClipIcon,
                theme: 'clear',
                className: 'message-tack-button',
            }),
            InputMessage: new Input({
                inputId: 'message-field',
                className: 'message-from-input',
                placeholder: 'Сообщение',
                inputName: 'message',
            }),
            SendButton: new Button({
                type: 'submit',
                theme: 'background',
                iconSrc: arrowRightSendIcon,
                className: 'message-send-button',
                onClick: () => this.sendMessage(),
            }),
            MessageForm: new MessageForm({
                formId: 'messageForm',
                onSubmit: () => this.sendMessage(),
            }),
            formId: 'messageForm',
        });

        setTimeout(async () => {
            this.updateChats();
            const result = await this.messengerService.GetUser();

            if (result?.status === 200) {
                this.currentUserId = JSON.parse(result.response)?.id;
            }
        });
    }

    render(): string {
        return template;
    }
}
