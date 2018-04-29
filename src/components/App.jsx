import React, { Component } from 'react';
import logo from '../wc_logo.png';
import Lookup from './Lookup.jsx';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <div className="headerContent">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GCPD Citizen Action Interface</h1>
        </div>
        </header>
        <div className="contentContainer">
          <Lookup />
        </div>
      </div>
    );
  }
}

export default App;
