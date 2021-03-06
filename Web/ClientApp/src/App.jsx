import React from 'react';
import * as api from './api/authentication';
import { Switch, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import MyProfile from './components/MyProfile'
import NavBar from './components/NavBar';
import SideNav from './components/SideNav';
import Register from './auth/Register';
import LogIn from './auth/Login';
import { actions } from './store/userStore';
import { useHistory } from 'react-router';
import topNavData from './datasets/topNavData.json'
import sideNavData from './datasets/sideNavData.json'
import Applications from './components/Applications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './custom.scss'
import './responsive.scss'

const initPath = topNavData.find(e => e.link === window.location.pathname) || sideNavData.find(e => e.link === window.location.pathname);
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="gray" size='10x'/>;

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [appState, setAppState] = React.useState("Loading")
  const [pageTitle, setPageTitle] = React.useState(initPath.title)
  const [initLoad, setInitLoad] = React.useState({
    reminders: false,
  });

  const loginUser = (data) => {
    dispatch(actions.signInUser(data));
    setAppState("Authorized");
  }

  const validateUser = (initLogin = false) => {
    api.validateUser().then(response => response.json())
    .then(data => {
      if (!data.title) {
        loginUser(data);
        if (initLogin) {
          history.push("/");
        }
      } else if (data.title === "Unauthorized") {
        setAppState("Unauthorized");
        history.push("/")
      }
    })
  }

  React.useEffect(() => {
    setInitLoad({
      reminders: true
    });
    validateUser();
  }, []);

  if (appState === "Authorized") {
    return (
      <div className="App">
          <NavBar 
            validateUser={validateUser}
            setPageTitle={setPageTitle}
            pageTitle={pageTitle}
          />
          <h2 id="mobile-page-title">{pageTitle}</h2>
          <main>
            <SideNav setPageTitle={setPageTitle} pageTitle={pageTitle} />
            <Switch>
              <Route exact path="/" 
                render={(rp) =>  <Dashboard initLoad={initLoad} setInitLoad={setInitLoad} {...rp}/>} 
              />
              <Route path="/my-profile"
                render={(rp) => <MyProfile {...rp}/>}
              />
              <Route path="/applications"
                render={(rp) => <Applications {...rp}/>}
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
              render={(rp) =>  <LogIn validateUser={validateUser} {...rp}/>} 
            />
            <Route path="/register"
              render={(rp) => <Register validateUser={validateUser} {...rp}/>}
            />
          </Switch>
      </div>
    )
  }

  if (appState === "Loading") {
    return (
      <div id="main-auth-loading-spinner">
        {spinner}
      </div>
    )
  }
  
};
