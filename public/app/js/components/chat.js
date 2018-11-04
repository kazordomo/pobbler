class Chat {

    constructor(user) {

        this.DOMElement = document.querySelector('section#chat');

        this.user = user;
        this.isTypingBool = false;
        this.timeout = null;

        this.msg_el_input = document.getElementById('section#chat chat_message');
        this.msgs_el_container = document.querySelector('section#chat .messages');

        this.socket = io();

        this.init();
    }

    init () {

        // Init the send button.
        this.DOMElement.querySelector('.form_fields button').addEventListener('click', () => {
            this.send(this.msg_el_input.value)
        });

        // Init the text input.
        this.msg_el_input.addEventListener('input', () => {
            this.socket.emit('typing', this.user.id);
        })

        // Init the socket listeners.
        this.socket.on('message', (user, message) => {
            this.fetch(user, message);
        });
        this.socket.on('typing', user => {
            this.isTyping(user);
        });
        this.socket.on('is not typing', () => {
            // TODO:
        });
    }

    send (message) {
        this.socket.emit('message', { user: this.user.id, message });

        // Reset the text-input.
        this.msg_el_input.value = '';
        this.msg_el_input.focus();
    }

    fetch ({ user, message }){

        // Show the message  on either the users or the friends side of the chat.
        let userClass = (user === this.user.id) ? 'user_message' : 'friend_message';
        let rowEl = document.createElement('div')
        let messageEl = document.createElement('div');

        this.isTypingTimeout();

        rowEl.className = 'row';
        messageEl.className = `message ${userClass}`;
        messageEl.innerHTML = message;

        rowEl.appendChild(messageEl);
        this.msgs_el_container.appendChild(rowEl);
    }

    isTypingTimeout (isUser) {

        // Ignore the rest of the function if user is stil typing.
        if(!this.isTypingBool)
            return;

        this.isTypingBool = false;

        // TODO: user "ifUser" to check instead of the element
        if(this.msgs_el_container.querySelector('.is_typing')) {
            this.msgs_el_container.removeChild(this.msgs_el_container.querySelector('.is_typing'));
        }

        this.socket.emit('is not typing');
    }

    isTyping (user) {

        // TODO: Fix this part
        
        // If typing-timeout already begun, refresh it.
        if(this.isTypingBool) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.isTypingTimeout(), 3000);
            return;
        }

        // Show the "is typing" icon on either the users or the friends side of the chat.
        let isUser = (user === this.user.id);
        let userClass = isUser ? '' : 'friend_message';

        this.socket.emit('typing', { user: this.user });

        this.isTypingBool = true;


        // If its not the user typing -> create the "is typing" element.
        if(!isUser) {

            let rowEl = document.createElement('div');
            let isTypingEl = document.createElement('div');
            
            rowEl.className = `is_typing ${userClass}`;
            isTypingEl.innerHTML = '- - -';
    
            rowEl.appendChild(isTypingEl);
            this.msgs_el_container.appendChild(rowEl);
        }

        // Check every third second if user is typing
        this.timeout = setTimeout(() => this.isTypingTimeout(isUser), 3000);
    }

}

export default Chat;