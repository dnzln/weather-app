import Component from '../../framework/Component';
import {WeatherForecastItem} from '../WeatherForecastItem';
import GlobalState from '../../../Services/GlobalState';

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('currentWeatherData', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.dayOfWeek = this.dayOfWeek.bind(this);
        this.getStartDay = this.getStartDay.bind(this);
        this.getMinMaxTemp = this.getMinMaxTemp.bind(this);
        this.state = {
        };
    }

    updateMyself(newValue) {        
        this.updateState(newValue);    
    }

    getStartDay() {
        let startFrom;
        let i = 0;
        do {
            if (this.state.forecastWeatherData.list[i].dt_txt.substring(8,10) != this.state.forecastWeatherData.list[i+1].dt_txt.substring(8,10)) startFrom = i + 1;
            i++;
        } while (startFrom == undefined)      
        return startFrom;
    }

    getMinMaxTemp(j) {
        let min = 150;
        let max = -150;
        for (let i = j; i < j + 8; i++) {
            if (this.state.forecastWeatherData.list[i] != undefined) {
                if (this.state.forecastWeatherData.list[i].main.temp < min) min = this.state.forecastWeatherData.list[i].main.temp;
                if (this.state.forecastWeatherData.list[i].main.temp > max) max = this.state.forecastWeatherData.list[i].main.temp;
            }
        }
        return ([min, max]);
    }

    dayOfWeek(dt) {
        let numberOfDay = new Date(dt * 1000);
        let names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return names[numberOfDay.getDay()];
    }

    render() {
        if (!this.state.forecastWeatherData) {
            return [
                {
                    tag: 'div',
                    classList: 'pre-loader',
                }
            ];
        } else {
            let itemsArray = [];
            let i = this.getStartDay();
            do {
                itemsArray.push(
                    {
                        tag: WeatherForecastItem,
                        props: {
                            wrapper: 'div',
                            wrapperClass: ['forecast-day'],
                            maxTemp: this.getMinMaxTemp(i),
                            minTemp: this.getMinMaxTemp(i),
                            icon: this.state.forecastWeatherData.list[i].weather[0].icon,
                            description: this.state.forecastWeatherData.list[i].weather[0].main,
                            day: this.dayOfWeek(this.state.forecastWeatherData.list[i].dt),
                        },
                    }
                );
                i += 8;
            } while (i <= 39)
        return itemsArray;
        }
    }
}
