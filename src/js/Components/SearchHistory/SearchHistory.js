import Component from '../../framework/Component';
import GlobalState from '../../../Services/GlobalState';
import WeatherDataService from '../../../Services/WeatherDataService';


export default class SearchHistory extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('searchQuery', this.updateMyself);
        GlobalState.watch('unitSwitcher', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.handleCleanList = this.handleCleanList.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        this.state = {
            favouriteList: [],
        }
    }

    updateMyself(newValue) {
        console.log(newValue.searchQuery);
        if (newValue.searchQuery) {
            this.state.favouriteList.push(newValue.searchQuery);
        }
        this.updateState(newValue);
        this._render();
    }

    handleCleanList() {
        this.state.favouriteList = [];
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
                    //searchQuery: data.name,
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
                classList: 'history-city-list',
                childrens: []
            }
            );
        for (let i = 0; i < this.state.favouriteList.length; i++) {
            let city = this.state.favouriteList[i];
            let historyObject = this;
            renderArray[1].childrens.push(
                {
                    tag: 'li',
                    classList: 'city-item',
                    content: city,
                    eventHandlers: {
                        click: function() {historyObject.handleListClick(city)},
                    },
                },
            );
        }

        return renderArray;

        // return [
        //     {
        //         tag: 'button',
        //         content: 'Clean',
        //         classList: 'clean-button',
        //     },
        //     {
        //         tag: 'ul',
        //         classList: 'history-city-list',
        //         childrens: [
        //             {
        //                 tag: 'li',
        //                 classList: 'city-item',
        //                 content: 'Minsk',
        //             },
        //             {
        //                 tag: 'li',
        //                 classList: 'city-item',
        //                 content: 'Donetsk',
        //             },
        //             {
        //                 tag: 'li',
        //                 classList: 'city-item',
        //                 content: 'Kiev',
        //             },
        //         ],
        //     },
        // ];
    }
}
