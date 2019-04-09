import {Component} from '../../framework';
import {TopMenu} from '../TopMenu';
import {SearchBar} from '../SearchBar';
import {CurrentWeather} from '../CurrentWeather';
import {WeatherForecast} from '../WeatherForecast';
import {CurrentWeatherDetails} from '../CurrentWeatherDetails';
import GlobalState from '../../../Services/GlobalState';
import WeatherDataService from '../../../Services/WeatherDataService';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    init() {
        this.infoBeforeSearchInput = this.infoBeforeSearchInput.bind(this);
    }

    
    render() {
        
        this.infoBeforeSearchInput();

        return [
            {
                tag: 'header',
                classList: 'main-header',
                childrens: [
                    {
                        tag: 'h1',
                        content: 'Weather application',
                        classList: 'visually-hidden',
                    },
                    {
                        tag: TopMenu,
                        props: {
                            wrapper: 'ul',
                            wrapperClass: ['options-list'],
                        },
                    },

                ],
            },
            {
                tag: SearchBar,
                props: {
                    wrapper: 'section',
                    wrapperClass: ['search-block'],
                },
            },
            {
                tag: 'div',
                classList: 'weather-info',
                childrens: [
                    {
                        tag: CurrentWeather,
                        props: {
                            wrapper: 'section',
                            wrapperClass: ['one-day-info', 'round-transparent'],
                        },
                    },
                    {
                        tag: CurrentWeatherDetails,
                        props: {
                            wrapper: 'section',
                            wrapperClass: ['details-block', 'round-transparent'],
                        },
                    },
                    {
                        tag: WeatherForecast,
                        props: {
                            wrapper: 'section',
                            wrapperClass: ['forecast', 'round-transparent'],
                        },
                    },
                ],
            },
        ];
    }

    infoBeforeSearchInput() {
        if (!GlobalState.watchers[0]) {
            navigator.geolocation.getCurrentPosition(userLocation, errorCase);

            function userLocation(pos) {
                WeatherDataService.getWeatherForecastOnCoord(pos.coords.latitude, pos.coords.longitude)
                    .then(data => {
                        GlobalState.update('forecastWeatherData', {
                            forecastWeatherData: data,
                        });
                    });
                WeatherDataService.getCurrentWeatherOnCoord(pos.coords.latitude, pos.coords.longitude)
                    .then(data => {
                        GlobalState.update('currentWeatherData', {
                            searchQuery: data.name,
                            currentWeatherData: data,
                        });
                    });
            }

            function errorCase() {
            WeatherDataService.getWeatherForecastOnQuery()
                .then(data => {
                    GlobalState.update('forecastWeatherData', {
                        searchQuery: 'Kiev',
                        forecastWeatherData: data,
                    });
                });
            WeatherDataService.getCurrentWeatherOnQuery()
                .then(data => {
                    GlobalState.update('currentWeatherData', {
                        currentWeatherData: data,
                    });
                });
            }
        }
    }
}
