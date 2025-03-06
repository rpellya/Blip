import { Message } from 'entities/Message';

export const mockMessages: Message[] = [
    {
        text: 'Привет!',
        time: '11:00',
        isCurrentUser: false,
    },
    {
        text: 'Привет! Как дела?',
        time: '11:05',
        isCurrentUser: true,
        isChecked: true,
    },
    {
        text: 'Всё хорошо, спасибо! А у тебя?',
        time: '11:10',
        isCurrentUser: false,
    },
    {
        text: 'Тоже всё хорошо!',
        time: '11:15',
        isCurrentUser: true,
        isChecked: true,
    },
    {
        text: 'Отлично!',
        time: '11:20',
        isCurrentUser: false,
    },
    {
        text: 'А что ты делаешь?',
        time: '11:25',
        isCurrentUser: true,
        isChecked: true,
    },
    {
        text: 'Программирую!',
        time: '11:30',
        isCurrentUser: false,
    },
    {
        text: 'Круто! Я тоже иногда программирую.',
        time: '11:35',
        isCurrentUser: true,
        isChecked: true,
    },
    {
        text: 'Здорово!',
        time: '11:40',
        isCurrentUser: false,
    },
    {
        text: 'До скорого!',
        time: '11:45',
        isCurrentUser: true,
        isChecked: true,
    },
];
