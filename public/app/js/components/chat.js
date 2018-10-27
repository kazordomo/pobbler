class Chat {

    constructor() {
        this.isTypingBool = false;
        this.timeout = null;

        this.msg_el_input = document.getElementById('chat_message');
        this.msgs_el_container = document.querySelector('section#chat .messages');

        this.socket = io();

        this.init();
    }

    init () {
        document.querySelector('.form_fields button').addEventListener('click', () => {
            this.send(this.msg_el_input.value)
        });

        this.msg_el_input.addEventListener('input', () => {
            this.socket.emit('typing');
        })

        this.socket.on('message', message => {
            this.fetch(message);
        });
        this.socket.on('typing', () => {
            this.isTyping();
        });
        this.socket.on('is not typing', () => {
            console.log('We need to broadcast this!!!!');
        });
    }

    send (message) {
        this.socket.emit('message', { user: 'Zak', message });
        
        if(this.isTypingBool)
            this.isTypingTimeout();

        this.msg_el_input.value = '';
        this.msg_el_input.focus();
    }

    fetch ({ user, message }){
        let rowEl = document.createElement('div')
        let messageEl = document.createElement('div');
        rowEl.className = 'row';
        messageEl.className = 'message user_message';
        messageEl.innerHTML = message;

        rowEl.appendChild(messageEl);
        this.msgs_el_container.appendChild(rowEl);
    }

    isTypingTimeout () {
        this.isTypingBool = false;
        this.msgs_el_container.removeChild(this.msgs_el_container.querySelector('.is_typing'));
        this.socket.emit('is not typing');
    }

    isTyping () {

        // If typing-timeout already begun, refresh it.
        if(this.isTypingBool) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.isTypingTimeout(), 3000);
            return;
        }

        this.isTypingBool = true;
        this.socket.emit('typing');
        let rowEl = document.createElement('div');
        let isTypingEl = document.createElement('div');
        rowEl.className = 'is_typing';
        isTypingEl.innerHTML = '- - -';

        rowEl.appendChild(isTypingEl);
        this.msgs_el_container.appendChild(rowEl);

        this.timeout = setTimeout(() => this.isTypingTimeout(), 3000);
    }

}

export default Chat;