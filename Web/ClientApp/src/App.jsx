import * as React from 'react';
import { Switch, Route } from 'react-router';
import Home from './components/Home';
import NavBar from './components/NavBar';

import './custom.css'

export default () => (
    <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" 
            render={(rp) =>  <Home {...rp}/>} 
          />
        </Switch>
      </div>
);