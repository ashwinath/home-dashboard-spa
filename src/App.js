import React, { Component } from 'react';
import './App.css';
import VpnStatus from './Components/VpnStatus';

class App extends Component {
  render() {
    return (
      <div>
          <VpnStatus />
      </div>
    );
  }
}

export default App;
