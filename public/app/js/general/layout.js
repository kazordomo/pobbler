class Layout {

    constructor (...pages) {
        // Layout takes multiple pages and calls their load method.
        this.pages = pages;
    }

    load () {
        // Call each page load method and return when all are resolved.
        return Promise.all(this.pages.map(page => page.load()));
    }

    render (element) {
        for (let page of this.pages) {
            const div = document.createElement('div');
            page.render(div);
            element.appendChild(div);
        }
    }
}

export default Layout;