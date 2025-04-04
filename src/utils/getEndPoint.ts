export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const WS_API_URL = 'wss://ya-praktikum.tech/ws';

export const getEndPoint = (...args: string[]): string => {
    const paths = args.map((str) => {
        if (str.startsWith('/')) {
            return str.slice(1);
        }
        if (str.endsWith('/')) {
            return str.slice(0, str.length - 1);
        }
        return str;
    });

    return encodeURI(paths.join('/'));
};

export const authEndPoint = getEndPoint(API_URL, 'auth');
export const userEndPoint = getEndPoint(API_URL, 'user');
export const CHATS_ENDPOINT = getEndPoint(API_URL, 'chats');
export const getAvatarSrc = (avatar: string | undefined | null) =>
    avatar ? getEndPoint(API_URL, 'resources', avatar) : undefined;
