import Router from './general/router';
import Layout from './general/layout';
import Page from './general/page';

new Router(
    {
        start: new Page('start.html'),
        chat: new Layout(new Page('sidebar.html'), new Page('chat.html', 'chat')),
        custom: new Layout(new Page('nav.html'), new Page('custom.html', 'custom')),
        notFound: new Page('404.html'),
        '#default': new Page('start.html'),
    },
    document.querySelector('main')
);