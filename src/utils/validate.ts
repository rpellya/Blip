const errorMessage = {
    phone: 'Некорректный номер телефона',
    password:
        'Пароль должен быть от 8 до 40 символов, хотя бы с одной заглавной буквой',
    email: 'Некорректный email',
    login: 'Некорректный логин',
    first_name: 'Некорректное имя',
    second_name: 'Некорректная фамилия',
};

export const validate = (
    fieldName: string,
    value: string,
    required?: boolean,
) => {
    if (!value && !!required) {
        return 'Заполните данные';
    }

    if (fieldName === 'message') {
        const isValid = /^(?!\s*$).+/.test(value);

        return isValid;
    }

    if (fieldName === 'phone') {
        const isValid = /^[+ ]?\d{10,15}$/.test(value);

        return !isValid && errorMessage[fieldName];
    }

    if (fieldName === 'password') {
        const isValid =
            /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{8,40}$/.test(value);

        return !isValid && errorMessage[fieldName];
    }

    if (fieldName === 'email') {
        const isValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            value,
        );

        return !isValid && errorMessage[fieldName];
    }

    if (fieldName === 'login') {
        const isValid = /^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/.test(value);

        return !isValid && errorMessage[fieldName];
    }

    if (fieldName === 'first_name' || fieldName === 'second_name') {
        const isValid = /^[А-ЯЁA-Z][а-яёa-z-]*$/.test(value);

        return !isValid && errorMessage[fieldName];
    }
};
