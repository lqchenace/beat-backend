import React, { Component } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom'
import Login from './routes/Login/index'

import './App.css';

class App extends Component {


  render() {
    return (
      <HashRouter>
        <Switch>
        <Route path='/login' component={Login}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
