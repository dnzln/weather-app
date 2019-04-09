import Component from '../../framework/Component';
import GlobalState from '../../../Services/GlobalState';
import WeatherDataService from '../../../Services/WeatherDataService';


export default class FavouriteLocations extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('searchQuery', this.updateMyself);
        GlobalState.watch('unitSwitcher', this.updateMyself);
        GlobalState.watch('favCityList', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        this.handleCleanList = this.handleCleanList.bind(this);
        this.state = {
            favCityList: [],
        }
    }

    updateMyself(newValue) {
        this.updateState(newValue);
    }

    handleCleanList() {
        this.state.favCityList = [];
        GlobalState.update('favCityList', {favCityList: this.state.favCityList});
        this._render();
    }

    handleListClick(city) {
        WeatherDataService.getWeatherForecastOnQuery(city, this.state.unitSwitcher)
            .then(data => {
                GlobalState.update('forecastWeatherData', {
                    forecastWeatherData: data,
                });
            });
        WeatherDataService.getCurrentWeatherOnQuery(city, this.state.unitSwitcher)
            .then(data => {
                GlobalState.update('currentWeatherData', {
                    searchQuery: data.name,
                    currentWeatherData: data,
                });
            });
    }

    render() {
        let renderArray = [];
        renderArray.push(
            {
                tag: 'button',
                content: 'Clean',
                classList: 'clean-button',
                eventHandlers: {
                    click: this.handleCleanList,
                },
            },
            {
                tag: 'ul',
                classList: 'favor-city-list',
                childrens: []
            }
            );
        for (let i = 0; i < this.state.favCityList.length; i++) {
            let city = this.state.favCityList[i];
            let favObject = this;
            renderArray[1].childrens.push(
                {
                    tag: 'li',
                    classList: 'city-item',
                    content: city,
                    eventHandlers: {
                        click: function() {favObject.handleListClick(city)},
                    },
                },
            );
        }

        return renderArray;
    }
}
