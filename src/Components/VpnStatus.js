import axios from 'axios';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class VpnStatus extends Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            error: false,
            loaded: false
        };
    }

    async componentDidMount() {
        let data;
        try {
            const response = await axios.get('/api/vpn');
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
                    ...data,
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
        const vpnStatus = this.state['vpn_status'];
        if (loaded && !error) {
            return (
                <Grid columns='equal'>
                    <Grid.Column/>

                    <Grid.Column width={12}>
                        <Grid celled>
                            <Grid.Row>
                                <VpnGrid vpnStatus={vpnStatus}/>
                                <Grid.Column width={13}>
                                    <p>IP: {this.state.ip}</p>
                                    <p>City: {this.state.city}</p>
                                    <p>Region: {this.state.region}</p>
                                    <p>Country: {this.state.country}</p>
                                    <p>Location: {this.state.loc}</p>
                                    <p>Organisation: {this.state.org}</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>

                    <Grid.Column/>
                </Grid>
            );
        } else if (loaded && error) {
            return <h1>An Error Occurred</h1>;
        } else {
            return (<div/>);
        }
    }
}

const VpnGrid = ({ vpnStatus }) => (
    <Grid.Column width={3} style={{textAlign: 'center'}} verticalAlign='middle'>
        {vpnStatus ?
            <div>
                <i className='fas fa-lock fa-5x green'></i>
                <h3 className='green'>VPN Connected</h3>
            </div>
        :
            <div>
                <i className='fas fa-lock-open fa-5x red'></i>
                <h3 className='red'>VPN Disconnected</h3>
            </div>
        }
    </Grid.Column>
);

export default VpnStatus;
