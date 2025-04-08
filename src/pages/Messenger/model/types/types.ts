export interface SearchUserData {
    id: number;
    first_name: string;
    second_name: string;
    display_name: null;
    login: string;
    avatar: string;
}

export interface ChatData {
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

export interface MessageData {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
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

export interface ChatUser {
    avatar: string | null;
    display_name: string;
    first_name: string;
    id: number;
    login: string;
    role: 'regular';
    second_name: string;
}
