import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', {
    url: 'http://test.com/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.MouseEvent = jsdom.window.MouseEvent;
