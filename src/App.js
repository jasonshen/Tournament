import React, { Component } from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import HomeContainer from "./components/containers/HomeContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={HomeContainer}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
