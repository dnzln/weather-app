import {CurrentWeather} from '../../src/js/Components/CurrentWeather';


const APPID = '88eb77ad52892a585149123b21737396';

class WeatherDataService {
    getCurrentWeather(query = 'Kiev', units = 'metric') {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APPID}&units=${units}`)
            .then(response => response.json())
    }

    getWeatherForecast(query = 'Kiev', units = 'metric') {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${APPID}&units=${units}`)
            .then(response => response.json())
            .then(data => data.list)
    }
}
  
export default new WeatherDataService();
