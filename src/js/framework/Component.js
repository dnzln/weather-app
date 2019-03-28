import GlobalState from "../../Services/GlobalState";

export default class Component {
    constructor(host, props = {}) {
        this.host = host;
        this.props = props;
        this.init();
        this.infoBeforeSearchInput();
        this.properIcon();
        this._render();
    }

    properIcon() {
        
    }

    infoBeforeSearchInput() {

    }

    init() {
        // binding and optional local state
    }

    updateState(newValue) {
        this.state = Object.assign({}, this.state, newValue);
        this._render();
    }

    _render() {
        this.host.innerHTML = '';
        let content = this.render();

        if (!Array.isArray(content)) {
            content = [ content ];
        }

        content.map( item => this._vDomPrototypeElementToHtmlElement(item))  // [string|HTMLElement] => [HTMLElement]
            .forEach(htmlElement => {
                this.host.appendChild(htmlElement);
            });
    }

    /* @returns {string|[string|HTMLElement|Component]} */    
    render() {
        return 'OMG! They wanna see me!!!!!! Aaaaaa';
    }

    /**
   *
   * @param {string|HTMLElement|Object} element
   * @private
   */  

  _vDomPrototypeElementToHtmlElement(element) {
        if (typeof element === 'string') {
            let container;
            const containsHtmlTags = /[<>&]/.test(element);
            if (containsHtmlTags) {
                container = document.createElement('div');
                container.innerHTML = element;
            } else {
                container = document.createTextNode(element);
            }
            return container;
        } else {
            if (element.tag) {
                if (typeof element.tag === 'function') {
                    let container;
                    if (element.props.wrapper) {
                        container = document.createElement(element.props.wrapper);
                        if (element.props.wrapperClass) container.classList.add(...element.props.wrapperClass);
                    } else {
                        container = document.createElement('div');
                    }
                    new element.tag(container, element.props);
                    return container;
                } else {
                    // string
                    const container = document.createElement(element.tag);
                    if (element.content) {
                        container.innerHTML = element.content;
                    }

                    ['classList', 'attributes', 'childrens'].forEach( item => {
                        if (element[item] && !Array.isArray(element[item])) {
                            element[item] = [element[item]];
                        }
                    });

                    if (element.classList) {
                        container.classList.add(...element.classList);
                    }

                    if (element.attributes) {
                        element.attributes.forEach(attributSpec => {
                            container.setAttribute(attributSpec.name, attributSpec.value);
                        });
                    }

                    // process eventHandlers
                    if (element.eventHandlers) {
                        Object.keys(element.eventHandlers).forEach( eventType => {
                            container.addEventListener(eventType, element.eventHandlers[eventType]);
                        });                        
                    }

                    if (element.childrens) {
                        element.childrens.forEach( children => {
                            const htmlElement = this._vDomPrototypeElementToHtmlElement(children);
                            container.appendChild(htmlElement);
                        });
                    }

                    return container;
                }
            }
            return element;
        }
    }
}
