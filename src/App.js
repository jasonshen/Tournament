import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
import Aux from './hoc/Aux/Aux';
import Home from './containers/Home/Home';
import MenuBar from './components/MenuBar/MenuBar';
import Broadcast from './containers/Broadcast/Broadcast';

class App extends Component {
  componentWillMount() {
    console.log('mounted');
  }

  render() {
    const routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/guardian" component={Broadcast} />
        {/* <Route path="/images" exact component={BroadcastList} /> */}
        <Redirect to="/home" />
      </Switch>
    );
    return (
      <Aux>
        <MenuBar />
        { routes }
      </Aux>
    );
  }
}

export default App;
