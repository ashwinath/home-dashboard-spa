import axios from 'axios';
import React, { Component } from 'react';
import Widget from './Widget';

class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loaded: false
        };
    }

    async componentDidMount() {
        let data;
        try {
            const response = await axios.get('/api/widgets');
            data = response.data
        } catch (e) {
            this.setState(() => {
                return {
                    error: true,
                    loaded: true,
                };
            });
        }

        if (data) {
            this.setState(() => {
                return {
                    error: false,
                    loaded: true,
                    widgets: data,
                };
            });

        } else {
            this.setState(() => {
                return {
                    error: true,
                    loaded: true,
                };
            });
        }
    }

    render() {
        const { loaded, error } = this.state;
        if (loaded && !error) {
            return (
                this.state.widgets.map(widget => <Widget key={widget.title} data={widget} />)
            );
        } else if (loaded && error) {
            return <h1>An Error Occurred</h1>;
        } else {
            return (<div/>);
        }
    }
}
export default Widgets;
