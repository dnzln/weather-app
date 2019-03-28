import Component from '../../framework/Component';

export default class FavouriteLocations extends Component{
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
                classList: 'favor-city-list',
                childrens: [
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'London',
                    },
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Donetsk',
                    },
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Lviv',
                    },
                ],
            },
        ];
    }
}
