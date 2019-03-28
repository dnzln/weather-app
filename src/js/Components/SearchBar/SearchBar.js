import Component from '../../framework/Component';
import WeatherDataService from "../../../Services/WeatherDataService";
import GlobalState from '../../../Services/GlobalState';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
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
        let searchInput = this.state.searchQuery = document.getElementById('search');
        WeatherDataService.getCurrentWeather(searchInput.value)
            .then(data => {
                GlobalState.update('currentWeatherData', {
                    searchQuery: searchInput.value,
                    currentWeatherData: data,
                });
            });
            
        WeatherDataService.getWeatherForecast(searchInput.value)
            .then(data => {
                GlobalState.update('forecastWeatherData', {
                    searchQuery: searchInput.value,
                    forecastWeatherData: data,
                });
            });
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
