class Custom {

    constructor () {
        
        this.DOMElement = document.querySelector('section#custom');
        this.init();

    }

    init () {

        this.DOMElement.querySelector('form button').addEventListener('click', event => {

            event.preventDefault();
            this._onClick();    
        });
    }

    _onClick () {

        const checkboxes = this.DOMElement.querySelectorAll('form input[type="checkbox');

        let values = Array.from(checkboxes)
                        .filter(checkbox => checkbox.checked)
                        .map(checkbox => checkbox.value);

        console.log('Find a proper chatroom with the values: ', values);
    }

}

export default Custom;