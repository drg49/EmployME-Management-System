import * as React from 'react'
import { Link } from 'react-router-dom'
import * as v from '../validations/authValidations'
import * as authApi from '../api/authentication'
import './auth.css'
import { applyMiddleware } from 'redux'

export default function AuthTemplate({ title }) {

    const [disabledState, setDisabledState] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
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
          return authApi.register(regState);
        }
        else if (title === "Login") {
          login.Password = loginState.Password;
          if (loginState.SignIn.split("").includes("@")) {
            login.Email = loginState.SignIn;
            return authApi.login(login);
          }
          login.Username = loginState.SignIn;
          setDisabledState(true)
          return authApi.login(login).then((response) => {
            if(response.ok) {
              return window.location.reload();
            } 
            setErrorMsg("Username or password is incorrect");
            return setDisabledState(false);
          });
        }
    }

    return (
        <section id="auth-main">
            <p id="logo">EmployME</p>
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
                  <label htmlFor="c-auth">Company</label>
                  <input className="em-input-auth"
                    type="text"
                    name="CompanyName"
                    id="c-auth"
                    maxLength="150"
                    onChange={handleRegister}
                  />
                  <input type="submit" value="Enter" id="auth-submit-btn"/>
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
                  <input 
                    type="submit" 
                    value="Enter"
                    id="auth-submit-btn"
                    disabled={disabledState}
                  />
                  <p><Link to="/register" id="signin-reg-links">Register here</Link></p>
                </>
                }
                </div>
            </form>
            <p id="auth-error-msg">{errorMsg}</p>
        </section>
    )
};
