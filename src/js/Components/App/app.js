import {Component} from '../../framework';
import {Temperature} from '../Temterature';
import {Wind} from '../Wind';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        const t1 = document.createElement('div');
        new Temperature(t1, {temperature: 12, unit: 'C'});

        const w1 = document.createElement('div');
        new Wind(w1, {speed: 100500, unit: 'mph'});
        
        return [
        'Temperature range',
        t1,
        {
            tag: Temperature,
            props: {
                temperature: 7,
                unit: 'C',
            },
        },
        {
            tag: Temperature,
            props: {
                temperature: 18,
                unit: 'C',
            },
        },
        {
            tag: 'div',
            content: 'Mi dive',
            classList: ['nice'],
            attributes: [
                {
                name: 'title',
                value: 'Me deveing calue',
                },
            ],
        },
        {
            tag: Wind,
            props: {
                speed: 122,
                unit: 'mph',
            },
        },
        w1,
        ];
    }
}
