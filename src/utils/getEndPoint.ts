export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const WS_API_URL = 'wss://ya-praktikum.tech/ws';

export const getEndPoint = (...args: string[]): string => {
    return args.join('/');
};

export const authEndPoint = getEndPoint(API_URL, 'auth');
