export interface Message {
    text: string;
    time: string;
    isCurrentUser: boolean;
    isChecked?: boolean;
}
