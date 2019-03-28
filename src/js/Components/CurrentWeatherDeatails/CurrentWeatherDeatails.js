import Component from '../../framework/Component';
import WeatherDataService from "../../../Services/WeatherDataService";
import GlobalState from '../../../Services/GlobalState';

export default class CurrentWeatherDeatails extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.state = {
            searchQuery: '',
            currentWeatherData: {
                main: {},
                sys: {},
                weather: [{}],
                coord: {},
                clouds: {},
                wind: {},
            },
        };
    }

    updateMyself(newValue) {        
        this.updateState(newValue);
        console.log('Current: ', this.state);
        console.log('Name: ', this.state.currentWeatherData.name);
    } 

    render() {
        return [
            {
                tag: 'h3',
                classList: 'block-header',
                content: 'In Deatail',
            },
            {
                tag: 'table',
                classList: 'weather-details',
                childrens: [
                    {
                        tag: 'tr',
                        classList: 'row',
                        childrens: [
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: 'Humidity',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${this.state.currentWeatherData.main.humidity}%`,
                            },
                        ],
                    },
                    {
                        tag: 'tr',
                        classList: 'row',
                        childrens: [
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: 'Cloudiness',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.clouds.all)}%`,
                            },
                        ],
                    },
                    {
                        tag: 'tr',
                        classList: 'row',
                        childrens: [
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: 'Pressure',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.main.pressure)} hPa`,
                            },
                        ],
                    },
                    {
                        tag: 'tr',
                        classList: 'row',
                        childrens: [
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: 'Wind speed',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.wind.speed)} m/s`,
                            },
                        ],
                    },
                    {
                        tag: 'tr',
                        classList: 'row',
                        childrens: [
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: 'Wind direction',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.wind.deg)}`,
                            },
                        ],
                    },
                    {
                        tag: 'tr',
                        classList: 'row',
                        childrens: [
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: 'Visibility',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.visibility)} m`,
                            },
                        ],
                    },
                    
                ],
            },
        ];
    }
}
