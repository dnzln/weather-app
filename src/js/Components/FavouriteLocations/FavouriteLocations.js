import Component from '../../framework/Component';
import GlobalState from '../../../Services/GlobalState';


export default class FavouriteLocations extends Component{
    constructor(host, props) {
        super(host, props);
        GlobalState.watch('currentWeatherData', this.updateMyself);
        GlobalState.watch('forecastWeatherData', this.updateMyself);
        GlobalState.watch('searchQuery', this.updateMyself);
        GlobalState.watch('unitSwitcher', this.updateMyself);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.state = {
            favouriteList: [],
        }
    }

    updateMyself(newValue) {
        if (newValue.unitSwitcher) {
            this.state.favouriteList.push(newValue.unitSwitcher);
        }
        this.updateState(newValue);
        this._render();
    }

    render() {
        // let renderArray = [];
        // renderArray.push(
        //     {
        //         tag: 'button',
        //         content: 'Clean',
        //         classList: 'clean-button',
        //     },
        //     {
        //         tag: 'ul',
        //         classList: 'favor-city-list',
        //         childrens: []
        //     }
        //     );
        // if (renderArray)

        return [
            {
                tag: 'button',
                content: 'Clean',
                classList: 'clean-button',
            },
            {
                tag: 'ul',
                classList: 'favor-city-list',
                childrens: [
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'London',
                    },
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Donetsk',
                    },
                    {
                        tag: 'li',
                        classList: 'city-item',
                        content: 'Lviv',
                    },
                ],
            },
        ];
    }
}
