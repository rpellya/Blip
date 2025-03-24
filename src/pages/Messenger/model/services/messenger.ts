import { Fetch } from 'utils/Fetch';
import { API_URL, getEndPoint, WS_API_URL } from 'utils/getEndPoint';

const CHATS_ENDPOINT = getEndPoint(API_URL, 'chats');

export class MessengerService {
    protected readonly requestService = new Fetch();

    public async GetChats() {
        const result = await this.requestService.get(CHATS_ENDPOINT, {
            method: 'GET',
            timeout: 0,
            headers: {
                Accept: 'application/json',
            },
        });

        return result;
    }

    public async PostChat(title: string, userId: number) {
        const result = await this.requestService.post(CHATS_ENDPOINT, {
            data: JSON.stringify({ title: title }),
            method: 'POST',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (result.status === 200) {
            const data: { id: string } = JSON.parse(result.response);

            const { status, response } = await this.requestService.put(
                getEndPoint(CHATS_ENDPOINT, 'users'),
                {
                    data: JSON.stringify({
                        users: [userId],
                        chatId: data.id,
                    }),
                    method: 'PUT',
                    timeout: 0,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (status === 200) {
                return response;
            }
        }
    }

    public async GetUsersByLogin(login: string) {
        const result = await this.requestService.post(
            getEndPoint(API_URL, 'user', 'search'),
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
    }

    public async ConnectToChat(chatId: number) {
        const result = await this.requestService.post(
            getEndPoint(CHATS_ENDPOINT, `token/${chatId}`),
            {
                method: 'POST',
                timeout: 0,
            },
        );

        if (result.status === 200) {
            const token = JSON.parse(result.response).token;
            const userId = localStorage.getItem('id');
            const socket = new WebSocket(
                getEndPoint(WS_API_URL, `chats/${userId}/${chatId}`, token),
            );

            socket.addEventListener('open', () => {
                setInterval(() => {
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

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            return socket;
        }
    }

    public GetChatMessages(socket: WebSocket) {
        socket.send(
            JSON.stringify({
                content: 0,
                type: 'get old',
            }),
        );
    }
}
