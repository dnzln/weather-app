import Component from '../../framework/Component';
import i01d from '../../../icons/01d.svg';
import i02d from '../../../icons/02d.svg';
import i03d from '../../../icons/03d.svg';
import i09d from '../../../icons/09d.svg';
import i10d from '../../../icons/10d.svg';
import i11d from '../../../icons/11d.svg';
import i13d from '../../../icons/13d.svg';
import i50d from '../../../icons/50d.svg';

export default class WeatherForecastItem extends Component{
    constructor(host, props) {
        super(host, props);
    }

    init() {
        this.properIcon = this.properIcon.bind(this);
    }

    render() {
        return [
            {
                tag: 'h3',
                classList: 'block-header',
                content: this.props.day.substring(0, 3),
            },
            {
                tag: 'img',
                classList: 'many-day-icon',
                attributes: [
                    {
                        name: 'src',
                        value: this.properIcon(this.props.icon),
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
                content: `${Math.round(this.props.maxTemp[1])}&deg; `,
            },
            {
                tag: 'span',
                classList: ['temprature-small', 'min-temp'],
                content: `${Math.round(this.props.minTemp[0])}&deg;`,
            },
            {
                tag: 'p',
                classList: 'weather-status-small',
                content: this.props.description,
            },
        ];
    }

    properIcon(iconCode) {
        switch(iconCode) {
            case '01n':
            case '01d': return i01d;
            case '02d': return i02d;
            case '02n':
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
