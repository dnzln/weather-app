import Component from '../../framework/Component';

export default class SearchHistory extends Component{
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return [
            {
                tag: 'button',
                content: 'Clean',
                classList: 'clean-button',
            },
            {
                tag: 'ul',
                classList: 'history-city-list',
                childrens: [
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Minsk',
                    },
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Donetsk',
                    },
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Kiev',
                    },
                ],
            },
        ];
    }
}
