export default class Component {
    constructor(host, props = {}) {
        this.host = host;
        this.props = props;
        this._render();
    }

    _render() {
        this.host.innerHTML = '';

        const content = this.render();
        if (typeof content === 'string') {
            this.host.innerHTML = content;
        } else {
            content.map( item => this._vDomProtoElementToHtmlElement(item))
                .forEach(htmlElement => {
                    this.host.appendChild(htmlElement);
                });
        }
    }
    
    render() {
        
    }

    _vDomProtoElementToHtmlElement(element) {
        if (typeof element === 'string') {
            const htmlElement = document.createElement('div');
            htmlElement.innerHTML = element;
            return htmlElement;
        } else {
            if (typeof element.tag === 'function') {
                const container = document.createElement('div');
                new element.tag(container, element.props)
                return container;
            }
            return element;
        }
    }
}
