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
            historyList: [],
        }
    }

    updateMyself(newValue) {
        console.log(newValue.searchQuery);
        if (newValue.searchQuery && this.state.historyList.indexOf(newValue.searchQuery) == -1) {
            this.state.historyList.unshift(newValue.searchQuery);
        }
        this.updateState(newValue);
        this._render();
    }

    handleCleanList() {
        this.state.historyList = [];
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
                classList: 'history-city-list',
                childrens: []
            }
            );
        for (let i = 0; i < this.state.historyList.length; i++) {
            let city = this.state.historyList[i];
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
