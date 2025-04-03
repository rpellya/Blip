export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const WS_API_URL = 'wss://ya-praktikum.tech/ws';

export const getEndPoint = (...args: string[]): string => {
    return args.join('/');
};

export const authEndPoint = getEndPoint(API_URL, 'auth');
export const userEndPoint = getEndPoint(API_URL, 'user');
export const CHATS_ENDPOINT = getEndPoint(API_URL, 'chats');
export const getAvatarSrc = (avatar: string | undefined | null) =>
    avatar ? getEndPoint(API_URL, 'resources', avatar) : undefined;
