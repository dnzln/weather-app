import Component from '../../framework/Component';
import FavouriteLocations from '../FavouriteLocations/FavouriteLocations';
import SearchHistory from '../SearchHistory/SearchHistory';

export default class TopMenu extends Component{
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return [            
            {
                tag: 'li',
                classList: ['options-item', 'round-transparent'],
                childrens: [
                    {
                        tag: 'span',
                        classList: 'list-button',
                        childrens: [
                            {
                                tag: 'a',
                                classList: 'link',
                                content: 'Favorites',
                                attributes: [
                                    {
                                        name: 'href',
                                        value: '#',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tag: FavouriteLocations,
                        props: {
                            wrapper: 'div',
                            wrapperClass: ['pop-favor', 'round-transparent'],
                        },
                    },
                ],
            },
            {
                tag: 'li',
                classList: ['options-item', 'round-transparent'],
                childrens: [
                    {
                        tag: 'span',
                        classList: 'list-button',
                        childrens: [
                            {
                                tag: 'a',
                                classList: 'link',
                                content: 'History',
                                attributes: [
                                    {
                                        name: 'href',
                                        value: '#',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tag: SearchHistory,
                        props: {
                            wrapper: 'div',
                            wrapperClass: ['pop-history', 'round-transparent'],
                        },
                    },
                ],
            },
            {
                tag: 'li',
                classList: ['options-item', 'round-transparent'],
                childrens: [
                    {
                        tag: 'input',
                        classList: ['visually-hidden', 'unit-change'],
                        attributes: [
                            {
                                name: 'type',
                                value: 'checkbox',
                            },
                            {
                                name: 'name',
                                value: 'units-input',
                            },
                            {
                                name: 'id',
                                value: 'units',
                            },
                        ],
                    },
                    {
                        tag: 'label',
                        classList: 'units-label',
                        attributes: [
                            {
                                name: 'for',
                                value: 'units',
                            },
                        ],
                    },
                ],
            }
        ];
    }        
}
