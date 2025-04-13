import { expect } from 'chai';
import { getDateString, getTimeString } from './getDateString';

describe('Get date string', () => {
    const date = new Date();

    it('should return today time', () => {
        expect(getDateString(date.toString())).to.be.equal(getTimeString(date));
    });

    it('should return today', () => {
        expect(getDateString(date.toString(), true)).to.be.equal('Сегодня');
    });

    it('should return yesterday', () => {
        date.setDate(date.getDate() - 1);
        expect(getDateString(date.toString())).to.be.equal('Вчера');
    });

    it('should return month string', () => {
        date.setMonth(date.getMonth() - 1);
        expect(getDateString(date.toString())).to.have.lengthOf(5);
    });

    it('should return full date string', () => {
        date.setFullYear(date.getFullYear() - 1);
        expect(getDateString(date.toString())).to.have.lengthOf(10);
    });
});
