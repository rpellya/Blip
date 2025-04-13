import { expect } from 'chai';
import Block from './Block';

describe('Block api testing', () => {
    let PageComponent: typeof Block;

    before(() => {
        class Page extends Block {
            constructor(props: Record<string, never>) {
                super(props);
            }

            render() {
                return `
                  <div id="wrapper">
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                    <div id="wrapper">
                      {{list}}
                    </div>
                  </div>
                `;
            }
        }

        PageComponent = Page;
    });

    it('Should create a stateful component from the constructor', () => {
        const text = 'Hello';
        const pageComponent = new PageComponent({ text });
        const spanText =
            pageComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).to.be.eq(text);
    });

    it('Should have a reactive behavior', () => {
        const newValue = 'New value';
        const pageComponent = new PageComponent({ text: 'Hello' });
        pageComponent.setProps({ text: newValue });
        const spanText =
            pageComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).to.be.eq(newValue);
    });

    it('Should return element type', () => {
        const pageComponent = new PageComponent();

        expect(pageComponent.getContent().tagName).to.be.equal('DIV');
    });
});
