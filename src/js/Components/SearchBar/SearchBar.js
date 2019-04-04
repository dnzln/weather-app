import Component from '../../framework/Component';
import WeatherDataService from "../../../Services/WeatherDataService";
import GlobalState from '../../../Services/GlobalState';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        // GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('unitSwitcher', this.updateMyself);
    }

    init() {
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.updateMyself = this.updateMyself.bind(this);
        this.state = {
            // searchQuery: value,
            // currentWeatherData: {},
        };

        // first init request to display default weather info
        
    }

    updateMyself(newValue) {
        this.updateState(newValue);
        //console.log(this.state);
    }

    handleSearchInput() {
        let searchInput = document.getElementById('search');
        if (searchInput.value.search(/[a-z]/) != -1) {
            console.log('query');
        WeatherDataService.getWeatherForecastOnQuery(searchInput.value, this.state.unitSwitcher)
            .then(data => {
                GlobalState.update('forecastWeatherData', {
                    searchQuery: searchInput.value,
                    forecastWeatherData: data,
                });
            });
            
        WeatherDataService.getCurrentWeatherOnQuery(searchInput.value, this.state.unitSwitcher)
            .then(data => {
                GlobalState.update('currentWeatherData', {
                    searchQuery: searchInput.value,
                    currentWeatherData: data,
                });
            });
        } else {
            console.log('coord');
            let coord = searchInput.value.replace(/,/g, ' ');
            coord = coord.split(' ');
            coord = coord.filter(el => el);
            WeatherDataService.getWeatherForecastOnCoord(coord[0], coord[1], this.state.unitSwitcher)
            .then(data => {
                GlobalState.update('forecastWeatherData', {
                    searchQuery: searchInput.value,
                    forecastWeatherData: data,
                });
            });
            
            WeatherDataService.getCurrentWeatherOnCoord(coord[0], coord[1], this.state.unitSwitcher)
            .then(data => {
                GlobalState.update('currentWeatherData', {
                    searchQuery: searchInput.value,
                    currentWeatherData: data,
                });
            });
        }
        
    }

    render() {
        return [
            {
                tag: 'input',
                classList: ['search-input', 'round-transparent'],
                eventHandlers: {
                    change: this.handleSearchInput,
                },
                attributes: [
                    {
                        name: 'placeholder',
                        value: 'Milan, IT',
                    },
                    {
                        name: 'type',
                        value: 'text',
                    },
                    {
                        name: 'name',
                        value: 'search-input',
                    },
                    {
                        name: 'id',
                        value: 'search',
                    },
                ],
            },
        ];
    }
}
