import React, { Component } from 'react';
import './App.css';
import Container from './Container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lucius 🦊</h1>
          <h3>Gothic City needs your help identifying villains!</h3>
        </header>
        <Container />
      </div>
    );
  }
}

export default App;
