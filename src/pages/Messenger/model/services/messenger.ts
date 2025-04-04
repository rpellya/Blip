import { Fetch } from 'utils/Fetch';
import {
    CHATS_ENDPOINT,
    getEndPoint,
    userEndPoint,
    WS_API_URL,
} from 'utils/getEndPoint';

export class MessengerService {
    protected readonly requestService = new Fetch();

    public async GetChats() {
        try {
            const result = await this.requestService.get(CHATS_ENDPOINT, {
                method: 'GET',
                timeout: 0,
                headers: {
                    Accept: 'application/json',
                },
            });

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    public async PostChat(title: string) {
        try {
            const result = await this.requestService.post(CHATS_ENDPOINT, {
                data: JSON.stringify({ title: title }),
                method: 'POST',
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    public async AddUserToChat(userId: string, chatId: number) {
        try {
            const result = await this.requestService.put(
                getEndPoint(CHATS_ENDPOINT, 'users'),
                {
                    data: JSON.stringify({
                        users: [userId],
                        chatId: chatId,
                    }),
                    method: 'PUT',
                    timeout: 0,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    public async GetUsersByLogin(login: string) {
        try {
            const result = await this.requestService.post(
                getEndPoint(userEndPoint, 'search'),
                {
                    data: JSON.stringify({ login: login }),
                    method: 'POST',
                    timeout: 0,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    public async GetChatsUsers(chatId: number) {
        try {
            const result = await this.requestService.get(
                getEndPoint(CHATS_ENDPOINT, `${chatId}/users`),
                {
                    method: 'GET',
                    timeout: 0,
                },
            );

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    public async ConnectToChat(chatId: number) {
        try {
            const result = await this.requestService.post(
                getEndPoint(CHATS_ENDPOINT, `token/${chatId}`),
                {
                    method: 'POST',
                    timeout: 0,
                },
            );

            if (result.status === 200) {
                const token = JSON.parse(result.response).token;
                const userId = sessionStorage.getItem('id');
                const socket = new WebSocket(
                    getEndPoint(WS_API_URL, `chats/${userId}/${chatId}`, token),
                );
                let intervalId: ReturnType<typeof setInterval>;

                socket.addEventListener('open', () => {
                    intervalId = setInterval(() => {
                        socket.send(
                            JSON.stringify({
                                type: 'ping',
                            }),
                        );
                    }, 10000);

                    this.GetChatMessages(socket);
                });

                socket.addEventListener('close', (event) => {
                    if (event.wasClean) {
                        console.log('Соединение закрыто чисто');
                    } else {
                        console.log('Обрыв соединения');
                    }
                    clearInterval(intervalId);
                    console.log(
                        `Код: ${event.code} | Причина: ${event.reason}`,
                    );
                });

                return socket;
            }
        } catch (e) {
            console.log(e);
        }
    }

    public GetChatMessages(socket: WebSocket) {
        try {
            socket.send(
                JSON.stringify({
                    content: 0,
                    type: 'get old',
                }),
            );
        } catch (e) {
            console.log(e);
        }
    }

    public async UploadAvatar(file: File, chatId: unknown) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            formData.append('chatId', chatId as string);

            const data = await this.requestService.put(
                getEndPoint(CHATS_ENDPOINT, 'avatar'),
                {
                    data: formData,
                    method: 'PUT',
                    timeout: 0,
                },
            );

            return data;
        } catch (e) {
            console.log(e);
        }
    }

    public async DeleteUserFromChat(chatId: number, userId: number) {
        try {
            const result = await this.requestService.delete(
                getEndPoint(CHATS_ENDPOINT, 'users'),
                {
                    data: JSON.stringify({
                        users: [userId],
                        chatId: chatId,
                    }),
                    method: 'DELETE',
                    timeout: 0,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    public async DeleteChatById(chatId: number) {
        try {
            const result = await this.requestService.delete(CHATS_ENDPOINT, {
                data: JSON.stringify({
                    chatId: chatId,
                }),
                method: 'DELETE',
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
