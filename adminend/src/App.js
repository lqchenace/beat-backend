import React, { Component } from 'react';
import {HashRouter , Route , Switch,Redirect} from 'react-router-dom'
import { createBrowserHistory } from "history";

import Login from './routes/Login/index';
import Index from './routes/Index/index';
import PrivateRoute from './routes/PrivateRoute/index';
import './App.css';
import './assets/font/iconfont.css'
class App extends Component {


  render() {
    return (
      <HashRouter  history={createBrowserHistory()}>
          <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/myhome" render={() => 
                      <Redirect to='/myhome/usermanage'></Redirect>}/>
                <PrivateRoute path="/" component={Index}/>
        </Switch>
      </HashRouter >

    );
  }
}

export default App;
