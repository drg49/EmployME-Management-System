import * as React from 'react'
import { Link } from 'react-router-dom'
import * as v from '../validations/authValidations'
import * as authApi from '../api/authentication'
import Toast from '../components/toasts'
import * as toastMethods from '../components/toastMethods'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './auth.scss'

const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="lg"/>

export default function AuthTemplate({ title, validateUser }) {
    const [disabledState, setDisabledState] = React.useState(false);

    const [regState, setRegState] = React.useState({
        FirstName: "",
        LastName: "",
        Username: "",
        Email: "",
        Password: "",
        CompanyName: ""
    });

    const [loginState, setLoginState] = React.useState({
        SignIn: "",
        Password: ""
    });

    const login = {
      Username: "",
      Email: "",
      Password: ""
    }

    const handleRegister = (e) => {
        setRegState({...regState, [e.target.name]: e.target.value})
    }

    const handleLogin = (e) => {
        setLoginState({...loginState, [e.target.name]: e.target.value})
    }

    const preventSpace = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    }

    const loginUser = (login) => {
      authApi.login(login).then((response) => {
        if (response.ok) {
          return validateUser(true);
        } 
        toastMethods.notifyError('Username or password is incorrect');
        return setDisabledState(false);
      });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledState(true)
        if (title === "User Registration") {
          if (v.usernameValidation(regState.Username)) {
            return false;
          }
          if (v.nameValidation(regState.FirstName)) {
            return false;
          }
          if (v.nameValidation(regState.LastName)) {
            return false;
          }
          return authApi.register(regState)
            .then((response) => {
              if (response.ok) {
                authApi.login({ Username: regState.Username, Password: regState.Password , Email: "" })
                  .then(() => {
                    validateUser(true)
                  })
              } else {
                response.text().then((message) => {
                  if (message === 'Email already exists') {
                    toastMethods.notifyError('Email already exists');
                  }
                  else if (message === 'Username already exists') {
                    toastMethods.notifyError('Username already exists');
                  } 
                  else if (message === 'Issue validating email') {
                    toastMethods.notifyError('There was an issue validating your email')
                  } 
                  else {
                    toastMethods.notifyError('There was an issue registering the user')
                  }
                  setDisabledState(false)
                });
              }
            })
        }
        else if (title === "Login") {
          login.Password = loginState.Password;
          if (loginState.SignIn.split("").includes("@")) {
            login.Email = loginState.SignIn;
            setDisabledState(true)
            return loginUser(login);
          }
          login.Username = loginState.SignIn;
          setDisabledState(true)
          return loginUser(login)
        }
    }

    return (
      <>
        <section id="auth-main">
            <p id="logo" style={{margin: '17px'}}>EmployME</p>
            <form id="auth-form" onSubmit={handleSubmit}>
                <p id="auth-title">{title}</p>
                <div id="input-wrapper">
                {title === "User Registration" 
                ? 
                <>
                  <div id="name-wrapper">
                    <div className="auth-input-field">
                      <label htmlFor="fn-auth">First Name</label><span id="required-auth">*</span>
                      <input
                        className="em-input-auth"
                        type="text" 
                        name="FirstName"
                        id="fn-auth"
                        maxLength="35"
                        required
                        onChange={handleRegister}
                      />
                    </div>
                    <div className="auth-input-field">
                      <label htmlFor="ln-auth">Last Name</label><span id="required-auth">*</span>
                      <input
                        className="em-input-auth"
                        type="text"
                        name="LastName"
                        id="ln-auth"
                        maxLength="35"
                        required
                        onChange={handleRegister}/>
                    </div>
                  </div>
                  <label htmlFor="un-auth">Username</label><span id="required-auth">*</span>
                  <input
                    className="em-input-auth"
                    type="text"
                    name="Username"
                    id="un-auth"
                    minLength="3"
                    maxLength="20"
                    required
                    onKeyDown={preventSpace}
                    onChange={handleRegister}
                  />
                  <label htmlFor="ea-auth">Email Address</label><span id="required-auth">*</span>
                  <input
                    className="em-input-auth"
                    type="email"
                    name="Email"
                    id="ea-auth"
                    minLength="3"
                    maxLength="100"
                    required
                    onKeyDown={preventSpace}
                    onChange={handleRegister}
                  />
                  <label htmlFor="p-auth">Password</label><span id="required-auth">*</span>
                  <input
                    className="em-input-auth"
                    type="password"
                    name="Password"
                    id="p-auth"
                    minLength="3"
                    maxLength="20"
                    required
                    onKeyDown={preventSpace}
                    onChange={handleRegister}
                  />
                  <label htmlFor="c-auth">Company</label><span id="required-auth">*</span>
                  <input className="em-input-auth"
                    type="text"
                    name="CompanyName"
                    id="c-auth"
                    maxLength="150"
                    required
                    onChange={handleRegister}
                  />
                  {disabledState ? spinner 
                  :
                  <input 
                    type="submit"
                    value="Enter" 
                    id="auth-submit-btn"
                    disabled={disabledState}
                  />}
                  <div id="existing-user-flex">
                    <p>Already have an account? </p>
                    <Link to="/" id="signin-reg-links">Sign in</Link>
                  </div>
                </>
                :
                <>
                  <label htmlFor="un-auth">Username or Email</label>
                  <input
                    className="em-input-auth"
                    type="text"
                    name="SignIn"
                    id="un-auth"
                    minLength="3"
                    maxLength="100"
                    required
                    onKeyDown={preventSpace}
                    onChange={handleLogin}
                  />
                  <label htmlFor="p-auth">Password</label>
                  <input
                    className="em-input-auth"
                    type="password"
                    name="Password"
                    id="p-auth"
                    minLength="3"
                    maxLength="20"
                    required
                    onKeyDown={preventSpace}
                    onChange={handleLogin}
                  />
                  {disabledState ? spinner
                  :
                  <input 
                    type="submit" 
                    value="Enter"
                    id="auth-submit-btn"
                    disabled={disabledState}
                  />}
                  <p><Link to="/register" id="signin-reg-links">Register here</Link></p>
                </>
                }
                </div>
            </form>

        </section>

        <Toast />
      </>
    )
};
