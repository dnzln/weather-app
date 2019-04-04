import Component from '../../framework/Component';
import FavouriteLocations from '../FavouriteLocations/FavouriteLocations';
import SearchHistory from '../SearchHistory/SearchHistory';
import GlobalState from '../../../Services/GlobalState';
import WeatherDataService from '../../../Services/WeatherDataService';

export default class TopMenu extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('searchQuery', this.updateMyself);
        GlobalState.watch('unitSwitcher', this.updateMyself);
    }

    init() {
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.updateMyself = this.updateMyself.bind(this);
    }

    updateMyself(newValue) {        
        this.updateState(newValue);
    }

    updateState(newValue) {
        this.state = Object.assign({}, this.state, newValue);
    }

    handleUnitChange() {
        let switcher = document.getElementById('units');
        if (!switcher.checked) {
            GlobalState.update('unitSwitcher', {unitSwitcher: 'metric',});
            WeatherDataService.getWeatherForecastOnQuery(this.state.searchQuery, this.state.unitSwitcher)
                .then(data => {
                    GlobalState.update('forecastWeatherData', {
                        //searchQuery: this.state.query,
                        forecastWeatherData: data,
                    });
                });

            WeatherDataService.getCurrentWeatherOnQuery(this.state.searchQuery, this.state.unitSwitcher)
                .then(data => {
                    GlobalState.update('currentWeatherData', {
                        currentWeatherData: data,
                    });
                });
        } else {
            GlobalState.update('unitSwitcher', {unitSwitcher: 'imperial',});
            WeatherDataService.getWeatherForecastOnQuery(this.state.searchQuery, this.state.unitSwitcher)
                .then(data => {
                    GlobalState.update('forecastWeatherData', {
                        //searchQuery: this.state.query,
                        forecastWeatherData: data,
                    });
                });

            WeatherDataService.getCurrentWeatherOnQuery(this.state.searchQuery, this.state.unitSwitcher)
                .then(data => {
                    GlobalState.update('currentWeatherData', {
                        currentWeatherData: data,
                    });
                });
        }
        console.log('sttttate',this.state);
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
                        eventHandlers: {
                            change: this.handleUnitChange,
                        },
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
