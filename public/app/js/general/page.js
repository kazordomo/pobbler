import Profile from '../components/profile';
import Chat from '../components/chat';
import Custom from '../components/custom';
import uuid from 'uuid';

class Page {

    constructor (url, script = null) {
        this.url = `app/views/${url}`;
        this.script = script;
    }

    load () {
        return fetch(this.url)
            .then(response => response.text())
            .then(data => this.html = data)
            .catch(err => this.html = 'Something went wrong!');
    }

    loadScript (script) {
        switch(script) {
            case 'profile':
                new Profile();
                break;
            case 'chat':
                new Chat({ id: uuid(), name: uuid() });
                break;
            case 'custom':
                new Custom();
                break;
            default:
                return false;
        }
    }

    render (element) {
        element.innerHTML = this.html;
        // Be sure that we render the html before the script
        setTimeout(() => this.loadScript(this.script), 0);
    }
}

export default Page;