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




    //   'Temperature range',
    //   t1,
    //   {
    //     tag: CurrentWeather,
    //   },
    //   {
    //     tag:  WeatherForecast,
    //     props: {
    //       forecast: [
    //         {
    //           date: '12-MAR-19',
    //           temperature: 18,
    //           windSpeed: 12,
    //           units: 'metric',
    //         },
    //         {
    //           date: '13-MAR-19',
    //           temperature: 19,
    //           windSpeed: 5,
    //           units: 'metric',
    //         },
    //         {
    //           date: '14-MAR-19',
    //           temperature: 22,
    //           windSpeed: 1,
    //           units: 'metric',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     tag: Temperature,
    //     props: {
    //       temperature: 7,
    //       unit: 'C',
    //     },
    //   },
    //   {
    //     tag: Temperature,
    //     props: {
    //       temperature: 18,
    //       unit: 'C',
    //     },
    //     // children: [], -- illegal
    //   },
    //   {
    //     tag: 'div',
    //     content: 'Me div',
    //     classList: ['nice'],
    //     attributes: [
    //       {
    //         name: 'title',
    //         value: 'Me definitely nice div',
    //       },
    //     ],
    //   },
    //   {
    //     tag: 'div',
    //     content: 'I am a parent div',
    //     attributes: [
    //       {
    //         name: 'title',
    //         value: 'I have got children',
    //       },
    //     ],
    //     children: [
    //       {tag:'div', content:'Child 1'},
    //       {
    //         tag:'div',
    //         content:'Child 2',
    //         children: [
    //           {tag:'div', content:'Child 2.1'},
    //           {tag:'div', content:'Child 2.2'},
    //           {tag:Temperature, props: {temperature:100, unit: 'K',}}
    //         ],
    //       },
    //       {tag:'div', content:'Child 3'},
    //       {
    //         tag: 'input',
    //         eventHandlers: {
    //           change: null, // this.handleChange, // bind(this): constructor(){this.method = this.method.bind(this);}
    //         },
    //       },
    //     ],
    //   }, // <div title="I have got children"><div>Child 1</dev><div>Child 2<d2.1/><d2.2/></dev><div>Child 2</dev> </div>
    //   {
    //     tag: Wind,
    //     props: {
    //       speed: 250,
    //       unit: 'mph',
    //     },
    //   },
    //   w1,
