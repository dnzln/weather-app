import Component from '../../framework/Component';
import imageUrl from '../../../icons/01d.svg';

export default class WeatherForecastItem extends Component{
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return [
            {
                tag: 'h3',
                classList: 'block-header',
                content: props.dayOfWeek,
            },
            {
                tag: 'img',
                classList: 'many-day-icon',
                attributes: [
                    {
                        name: 'src',
                        value: imageUrl,
                    },
                    {
                        name: 'alt',
                        value: 'Sunny',
                    },
                ],
            },
            {
                tag: 'span',
                classList: 'temprature-small',
                content: `${props.temperature}&deg;`,
            },
            {
                tag: 'span',
                classList: 'weather-status-small',
                content: 'Clear sky',
            },
        ];
    }
}
