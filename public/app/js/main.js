import Router from './general/router';
import Layout from './general/layout';
import Page from './general/page';

new Router(
    {
        start: new Page('start.html'),
        profile: new Layout(new Page('nav.html'), new Page('profile.html', 'profile')),
        chat: new Layout(new Page('nav.html'), new Page('chat.html', 'chat')),
        notFound: new Page('404.html'),
        '#default': new Page('start.html'),
    },
    document.querySelector('main')
);