import Component from '../../framework/Component';
import {WeatherForecastItem} from '../WeatherForecastItem';
import WeatherDataService from "../../../Services/WeatherDataService";
import GlobalState from '../../../Services/GlobalState';

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('currentWeatherData', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.state = {
            forecastWeatherData: [{}],
            currentWeatherData: {
                weather: [],
            },
        };
    }

    updateMyself(newValue) {        
        this.updateState(newValue);
        console.log('State: ', this.state);
        console.log('Current weater: ', this.state.currentWeatherData.weather[0].description);
        console.log('Forecast dt: ', this.state.forecastWeatherData[1].dt);
        
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
