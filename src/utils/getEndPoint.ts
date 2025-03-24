export const API_URL = 'https://ya-praktikum.tech/api/v2';

export const getEndPoint = (...args: string[]): string => {
    return args.join('/');
};

export const authEndPoint = getEndPoint(API_URL, 'auth');
