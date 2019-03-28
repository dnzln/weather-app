import Component from '../../framework/Component';
import {WeatherForecastItem} from '../WeatherForecastItem';
import WeatherDataService from "../../../Services/WeatherDataService";
import GlobalState from '../../../Services/GlobalState';

export default class WeatherForecast extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.state = {
            // searchQuery: value,
            // forecastWeatherData: {},
        }
    }

    updateMyself(newValue) {        
        this.updateState(newValue);
        console.log('Forecast123: ', this.state);
        // console.log('Name: ', this.state.forecastWeatherData.city.name);   
    }

    render() {
        return [
            {
                tag: WeatherForecastItem,
                props: {
                    wrapper: 'div',
                    wrapperClass: ['forecast-day'],
                },
            },
            {
                tag: WeatherForecastItem,
                props: {
                    wrapper: 'div',
                    wrapperClass: ['forecast-day'],
                },
            },
            {
                tag: WeatherForecastItem,
                props: {
                    wrapper: 'div',
                    wrapperClass: ['forecast-day'],
                },
            },
            {
                tag: WeatherForecastItem,
                props: {
                    wrapper: 'div',
                    wrapperClass: ['forecast-day'],
                },
            },
            {
                tag: WeatherForecastItem,
                props: {
                    wrapper: 'div',
                    wrapperClass: ['forecast-day'],
                },
            },
        ];
    }
}
