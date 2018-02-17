import axios from 'axios';
import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

const Widget = ({ data }) => {
    const onClick = () => {
        window.location = data.link;
    }

    const {
        icon_path,
        title,
        desc,
    } = data;

    return (
        <Grid columns='equal'>
            <Grid.Column/>
            <Grid.Column width={12}>
                <Grid celled>
                    <Grid.Row verticalAlign='middle' >
                        <IconImage icon_path={icon_path} onClick={onClick}/>
                        <Description title={title} desc={desc}/>
                        <PowerStatus title={title}/>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column/>
        </Grid>
    );
}

const IconImage = ({ onClick, icon_path }) => {
    return (
        <Grid.Column width={3}>
            <Image
                className='img-icon'
                onClick={onClick}
                centered={true}
                size='small'
                src={icon_path}/>
        </Grid.Column>
    )
}

class PowerStatus extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.title
        this.state = {
            initial: {
                loaded: false,
            }
        }
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount() {
        const url = `/api/widgets/check-online?title=${this.title}`
        try {
            const response = await axios.get(url);
            this.setState(() => {
                return {
                    initial: {
                        loaded: true,
                    },
                    serviceStatus: response.data.status,
                }
            });
        } catch (e) {
            this.setState(() => {
                return {
                    initial: {
                        loaded: true,
                    },
                    serviceStatus: false,
                }
            });
        }
    }

    async onClick() {
        const url = `/api/widgets/start`;
        const body = {
            title: this.title
        }
        try {
            const { data } = await axios.post(url, body);
            this.setState(() => {
                return {
                    ...this.state,
                    serviceStatus: data.start,
                }
            });
        } catch (e) {
            alert("Could not turn on service.")
        }
    }

    render() {
        if (this.state.initial.loaded) {
            const colour = this.state.serviceStatus ? "green" : "red";
            return (
                <Grid.Column
                    width={3}
                    style={{textAlign: 'center'}}
                    onClick={this.onClick}
                    className="img-icon"
                    verticalAlign='middle'>
                    <i 
                        className={`fas fa-power-off fa-5x ${colour}`}></i>
                </Grid.Column>
            );
        } else {
            return (
                <div/>
            )
        }
    }
}

const Description = ({ title, desc }) => {
    return (
        <Grid.Column width={10}>
            <h3>{title}</h3>
            <p>{desc}</p>
        </Grid.Column>
    )
}

export default Widget;
