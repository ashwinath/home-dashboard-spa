import React, { Component } from 'react';
import './App.css';
import VpnStatus from './Components/VpnStatus';
import Widgets from './Components/Widgets'

class App extends Component {
    render() {
        return (
            <div>
                <VpnStatus />
                <Widgets />
            </div>
        );
    }
}

export default App;
