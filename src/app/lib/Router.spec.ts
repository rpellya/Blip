import { expect } from 'chai';
import Router, { isEqual, AppRoutes } from './Router';
import Block from './Block';

describe('String comparison', () => {
    it('should return true to equal strings', () => {
        return expect(isEqual('test!', 'test!')).to.be.true;
    });
    it('should return false to unequal strings', () => {
        return expect(isEqual('test!', 'test?')).to.be.false;
    });
});

describe('Custom router api testing', () => {
    const routePath = AppRoutes.SERVER_ERROR;
    const page = class Page extends Block {};

    it('should store component for each page', () => {
        return expect(
            Router.registerRoute(routePath, page)?.getRoute(routePath),
        ).to.not.undefined;
    });

    beforeEach(() => Router.go(routePath));

    it('should use window history api', () => {
        return expect(window.location.pathname.includes(routePath)).to.be.true;
    });
});
