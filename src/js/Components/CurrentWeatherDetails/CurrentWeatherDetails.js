import Component from '../../framework/Component';
import GlobalState from '../../../Services/GlobalState';

export default class CurrentWeatherDetails extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('unitSwitcher', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.windSpeed = this.windSpeed.bind(this);
        this.state = {
            searchQuery: '',
        };
    }

    updateMyself(newValue) {        
        this.updateState(newValue);
    }

    windSpeed() {
        return this.state.unitSwitcher == undefined ? 'Wind speed (m/s)' : this.state.unitSwitcher == 'metric' ? 'Wind speed (m/s)' : 'Wind speed (mph)';
    }

    render() {
        if (!this.state.currentWeatherData) {
            return [
                {
                    tag: 'div',
                    classList: 'pre-loader',
                }
            ];
        } else {
        return [
            {
                tag: 'h3',
                classList: 'block-header',
                content: 'In Detail',
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
                                content: 'Humidity (%)',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${this.state.currentWeatherData.main.humidity}`,
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
                                content: 'Cloudiness (%)',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.clouds.all)}`,
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
                                content: 'Pressure (hPa)',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: this.state.currentWeatherData.main.pressure,
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
                                content: 'Visibility (m)',
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: `${Math.round(this.state.currentWeatherData.visibility)}`,
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
                                content: this.windSpeed(),
                            },
                            {
                                tag: 'td',
                                classList: ['cell', 'decorated'],
                            },
                            {
                                tag: 'td',
                                classList: 'cell',
                                content: this.state.currentWeatherData.wind.speed,
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
                ],
            },
        ];
    }
    }
}
