import * as React from 'react';
import * as api from './api/authentication';
import { Switch, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard/index';
import NavBar from './components/NavBar';
import SideNav from './components/SideNav';
import Register from './auth/Register';
import LogIn from './auth/Login';
import { actions } from './store/userStore';
import './custom.css'

export default function App() {
  const dispatch = useDispatch();
  const [appState, setAppState] = React.useState("Loading")

  const loginUser = (data) => {
    dispatch(actions.signInUser(data))
    setAppState("Authorized")
  }

  React.useEffect(() => {
    api.validateUser().then(response => response.json())
    .then(data => {
      if (!data.title) {
        loginUser(data)
      } else if (data.title === "Unauthorized") {
        setAppState("Unauthorized")
      }
    })
  }, []);

  if (appState === "Authorized") {
    return (
      <div className="App">
          <NavBar />
          <main>
            <SideNav />
          <Switch>
            <Route exact path="/" 
              render={(rp) =>  <Dashboard {...rp}/>} 
            />
          </Switch>
          </main>
        </div>
    )
  }

  if (appState === "Unauthorized") {
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" 
              render={(rp) =>  <LogIn {...rp}/>} 
            />
            <Route path="/register"
              render={(rp) => <Register {...rp}/>}
            />
          </Switch>
      </div>
    )
  }

  if (appState === "Loading") {
    return (
      <p>Loading</p>
    )
  }
  
};
