import Component from '../../framework/Component';
import {WeatherForecastItem} from '../WeatherForecastItem';
import WeatherDataService from "../../../Services/WeatherDataService";
import GlobalState from '../../../Services/GlobalState';

export default class WeatherForecast extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself)
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.whenStartNextDay = this.whenStartNextDay.bind(this);
        this.state = {
            searchQuery: 'value',
            forecastWeatherData: {
                list: [{}],
            },
            currentWeatherData: {
                main: {},
                sys: {},
                weather: [{}],
                coord: {},
                clouds: {},
                wind: {},
            },
        }
    }

    updateMyself(newValue) {        
        this.updateState(newValue);
        console.log('Forecast: ', this.state);
        // console.log('Name: ', this.state.forecastWeatherData.city.name);   
    }

    whenStartNextDay() {
        let CurrentDay = new Date(this.state.currentWeatherData.dt * 1000);
        CurrentDay = CurrentDay.getDay();
        let startDay;
        var i = 0;
        do {
            let day = new Date(this.state.currentWeatherData.dt * 1001)
            if (day.getDay() != CurrentDay) startDay = day.getDay();
            i++;
        } while (startDay != undefined)
        return i;
    }

    dayOfWeek(td) {
        td = td * 1000;  
        let names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return names[td.getDay()];
    }

    render() {
        let index = this.whenStartNextDay();
        let finalArray = [];
        for (let i = 0; i < 5; i++) {
            finalArray.push(
                {
                    tag: WeatherForecastItem,
                    props: {
                        wrapper: 'div',
                        wrapperClass: ['forecast-day'],
                        temperature: this.state.forecastWeatherData.list[index].main.temp,
                        dayOfWeek: this.dayOfWeek(this.state.forecastWeatherData.list[index].dt),
                        icon: this.state.forecastWeatherData.list[index].weather.icon,
                    },
                },
            )
            index += 8;
        }
        return finalArray;
    }
}
