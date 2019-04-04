import {CurrentWeather} from '../../src/js/Components/CurrentWeather';


const APPID = '88eb77ad52892a585149123b21737396';

class WeatherDataService {
    getCurrentWeatherOnQuery(query = 'Kiev', units = "metric") {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APPID}&units=${units}`)
            .then(response => response.json())
    }

    getCurrentWeatherOnCoord(lat, lon, units = "metric") {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}&units=${units}`)
            .then(response => response.json())
    } 

    getWeatherForecastOnQuery(query = 'Kiev', units = "metric") {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${APPID}&units=${units}`)
            .then(response => response.json())
    }

    getWeatherForecastOnCoord(lat, lon, units = "metric") {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APPID}&units=${units}`)
            .then(response => response.json())
    } 
}
  
export default new WeatherDataService();
