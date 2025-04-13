import { expect } from 'chai';
import { API_URL, getEndPoint } from './getEndPoint';

describe('Get endpoint', () => {
    it('should return url from args', () => {
        return expect(getEndPoint(API_URL, 'test', 'string')).to.be.equal(
            'https://ya-praktikum.tech/api/v2/test/string',
        );
    });

    it('should return correctly encoded url', () => {
        return expect(
            getEndPoint(API_URL, 'test', ' ', 'with spaces'),
        ).to.be.equal(
            'https://ya-praktikum.tech/api/v2/test/%20/with%20spaces',
        );
    });
});
