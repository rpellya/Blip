export const getDateString = (
    dateString: string | undefined,
    isDateOnly?: boolean,
): string => {
    if (!dateString) {
        return '';
    }

    const today = new Date();
    const date = new Date(dateString);
    const todayDay = today.getDate();
    const dateDay = date.getDate();
    const todayMonth = today.getMonth();
    const dateMonth = date.getMonth();
    const todayYear = today.getFullYear();
    const dateYear = date.getFullYear();

    if (
        todayDay === dateDay &&
        todayMonth === dateMonth &&
        todayYear === dateYear &&
        !isDateOnly
    ) {
        return getTimeString(date);
    }

    if (todayMonth === dateMonth && todayYear === dateYear) {
        if (todayDay - 1 === dateDay) {
            return 'Вчера';
        }
        if (todayDay === dateDay) {
            return 'Сегодня';
        }
    }

    const month = `0${dateMonth}`.slice(-2);
    const day = `0${dateDay}`.slice(-2);

    if (todayYear !== dateYear) {
        return `${day}.${month}.${dateYear}`;
    }

    if (todayDay > dateDay || todayMonth > dateMonth) {
        return `${day}.${month}`;
    }

    return '';
};

export const getTimeString = (date: Date) => {
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    return `${hours}:${minutes}`;
};
