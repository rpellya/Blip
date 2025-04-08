import { getDateString } from './getDateString';

export const isSameDate = (firstDateStr: string, secondDateStr: string) => {
    return (
        getDateString(firstDateStr, true) === getDateString(secondDateStr, true)
    );
};
