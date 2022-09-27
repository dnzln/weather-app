import i01d from '../../../icons/01d.svg';
import i01n from '../../../icons/01n.svg';
import i02d from '../../../icons/02d.svg';
import i02n from '../../../icons/02n.svg';
import i03d from '../../../icons/03d.svg';
import i09d from '../../../icons/09d.svg';
import i10d from '../../../icons/10d.svg';
import i11d from '../../../icons/11d.svg';
import i13d from '../../../icons/13d.svg';
import i50d from '../../../icons/50d.svg';
import GlobalState from '../../../Services/GlobalState';
import Component from '../../framework/Component';

export default class CurrentWeather extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('searchQuery', this.updateMyself);
        GlobalState.watch('favCityList', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.dayOfWeek = this.dayOfWeek.bind(this);
        this.properIcon = this.properIcon.bind(this);
        this.handlerFavorButton = this.handlerFavorButton.bind(this);
        this.state = {
            favCityList: [],
        };
    }

    dayOfWeek() {
        let numberOfDay = new Date(this.state.currentWeatherData.dt * 1000);
        let names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return names[numberOfDay.getDay()];
    }

    updateMyself(newValue) {
        this.updateState(newValue);
    }

    handlerFavorButton() {
        let favButton = document.getElementById('favor');
        if (!favButton.checked) {
            this.state.favCityList.push(this.state.searchQuery)
            GlobalState.update('favCityList', {favCityList: this.state.favCityList});
        } else {
            let i = this.state.favCityList.indexOf(this.state.searchQuery);
            this.state.favCityList.splice(i, 1);
            GlobalState.update('favCityList', {favCityList: this.state.favCityList});
        }
    }

    render() {
        if (!this.state.currentWeatherData) {
            return [
                {
                    tag: 'div',
                    classList: 'pre-loader',
                }
            ];
        } else {
        let isChecked;
        if (this.state.favCityList.indexOf(this.state.currentWeatherData.name) != -1) {
            isChecked = 'checked';   
        }
        return [
            {
                tag: 'h2',
                classList: 'city-name',
                content: `${this.state.currentWeatherData.name}, ${this.state.currentWeatherData.sys.country}`,
            },
            {
                tag: 'div',
                classList: 'fav-button',
                eventHandlers: {
                    click: this.handlerFavorButton,
                },
                childrens: [
                    {
                        tag: 'input',
                        classList: ['visually-hidden', 'add-to-fav'],
                        attributes: [
                            {
                                name: 'type',
                                value: 'checkbox',
                            },
                            {
                                name: 'name',
                                value: 'units-input',
                            },
                            {
                                name: 'id',
                                value: 'favor',
                            },
                            {
                                name: isChecked,
                                value: isChecked,
                            },
                        ],
                    },
                    {
                        tag: 'label',
                        classList: 'favor-label',
                        attributes: [
                            {
                                name: 'for',
                                value: 'favor',
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'h3',
                classList: ['block-header', 'after-city'],
                content: this.dayOfWeek(),
            },
            {
                tag: 'img',
                classList: 'one-day-icon',
                attributes: [
                    {
                        name: 'src',
                        value: this.properIcon(),
                    },
                    {
                        name: 'alt',
                        value: 'Sunny',
                    },
                ],
            },
            {
                tag: 'span',
                classList: 'temprature-big',
                content: `${Math.round(this.state.currentWeatherData.main.temp)}&deg;`,
            },
            {
                tag: 'span',
                classList: 'weather-status',
                content: this.state.currentWeatherData.weather[0].description,
            },
        ];
        }
    }

    properIcon() {
        switch(this.state.currentWeatherData.weather[0].icon) {
            case '01n': return i01n;
            case '01d': return i01d;
            case '02d': return i02d;
            case '02n': return i02n;
            case '03d':
            case '03n':
            case '04d':
            case '04n': return i03d;
            case '09d':
            case '09n': return i09d;
            case '10d':
            case '10n': return i10d;
            case '11d':
            case '11n': return i11d;
            case '13d':
            case '13n': return i13d;
            case '50d':
            case '50n': return i50d;
        }
    }
}
