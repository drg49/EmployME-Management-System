import React from 'react'
import Modal from 'react-modal'
import Toast from "../toasts";
import * as toastMethods from "../toastMethods";
import * as api from '../../api/authentication'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWindowClose, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { actions } from '../../store/userStore';

import '../../auth/auth.scss'
import './index.scss'
const moment = require('moment')
const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
const closeIcon = <FontAwesomeIcon icon ={faWindowClose} />
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="lg" />

export default function MyProfile () {
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [modalState, setModalState] = React.useState({
      isOpen: false,
      isUserUpdate: false,
      isPasswordChange: false,
    })

    const [isLoading, setIsLoading] = React.useState(false)

    const [userState, setUserState] = React.useState({
      userId: state.userId,
      firstName: state.firstName,
      lastName: state.lastName,
      username: state.username,
      email: state.email,
      companyName: state.companyName,
    })

    const [passwordState, setPasswordState] = React.useState({
      userId: state.userId,
      oldPassword: '',
      newPassword: '',
      retypePassword: '',
    })

    const handleChange = (e) => {
      setUserState({ ...userState, [e.target.name]: e.target.value })
    }

    const updatePasswordState = (e) => {
      setPasswordState({ ...passwordState, [e.target.name]: e.target.value })
    }

    const handleUpdate = () => {
      setModalState({ isOpen: true, isUserUpdate: true, isPasswordChange: false });
    }

    const handlePasswordChange = () => {
      setModalState({ isOpen: true, isPasswordChange: true, isUserUpdate: false })
    }

    const preventSpace = (e) => {
      if (e.key === " ") {
          e.preventDefault();
      }
    }

    const handleSubmit = (e, option) => {
      e.preventDefault();
      setIsLoading(true)

      if (option === 'Update') {
        api.updateUser(userState)
        .then(() => {
          dispatch(actions.signInUser(userState))
          setModalState({ ...modalState, isOpen: false });
          toastMethods.notifySuccess("Your profile has been updated")
          setIsLoading(false)
        })
        .catch(() => toastMethods.notifyError("There was an error updating your profile"))
      }
      else if (option === 'Password') {
        if (passwordState.newPassword !== passwordState.retypePassword) {
          return toastMethods.notifyError("Passwords do not match")
        }
        api.changePassword(passwordState)
          .then(() => {
            setModalState({ ...modalState, isOpen: false });
            toastMethods.notifySuccess("Your password has been changed");
            setIsLoading(false)
          })
      }
    }

    return (
      <>
        <div id="my-profile-container">
          <div>
            <h1>{state.firstName} {state.lastName}</h1>
            <button 
              className='strip-btn'
              onClick={handleUpdate}
            >
              {editIcon}
            </button>
          </div>
          <p>Company: <span>{state.companyName}</span></p>
          <p>Username: <span>{state.username}</span></p>
          <p>Email: <span>{state.email}</span></p>
          <p>Joined: <span>{moment(state.joinedDate).format('MMMM DD, YYYY')}</span></p>
          <span
            id="auth-update-pass-change"
            onClick={handlePasswordChange}
          >
            Change password
          </span>
        </div>

        <Modal
          isOpen={modalState.isOpen}
          className="mymodal"
          overlayClassName="myoverlay"
        >
          <div className="modal-action-header" style={{marginBottom: "21px"}}>
            <h2>{modalState.isUserUpdate ? 'Update User' : 'Change Password'}</h2>
            <button
              onClick={() => setModalState({ isOpen: false })}
              className="strip-btn close-btn"
            >
              {closeIcon}
            </button>
          </div>
          {modalState.isUserUpdate ? 
          <form onSubmit={(e) => handleSubmit(e, 'Update')}>
            <div id="name-wrapper" style={{gap: "1rem"}}>
              <div className="auth-input-field">
                <label htmlFor="fn-auth">First Name</label><span id="required-auth">*</span>
                <input
                  className="em-input-update"
                  type="text" 
                  name="firstName"
                  id="fn-auth"
                  maxLength="35"
                  required
                  defaultValue={state.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="auth-input-field">
                <label htmlFor="ln-auth">Last Name</label><span id="required-auth">*</span>
                <input
                  className="em-input-update"
                  type="text"
                  name="lastName"
                  id="ln-auth"
                  maxLength="35"
                  required
                  defaultValue={state.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div id="name-wrapper" style={{gap: "1rem"}}>
              <div>
                <label htmlFor="un-auth">Username</label><span id="required-auth">*</span>
                <input
                  className="em-input-update"
                  type="text"
                  name="username"
                  id="un-auth"
                  minLength="3"
                  maxLength="20"
                  required
                  onKeyDown={preventSpace}
                  defaultValue={state.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="ea-auth">Email Address</label><span id="required-auth">*</span>
                <input
                  className="em-input-update"
                  type="email"
                  name="email"
                  id="ea-auth"
                  minLength="3"
                  maxLength="100"
                  required
                  onKeyDown={preventSpace}
                  defaultValue={state.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="c-auth">Company</label><span id="required-auth">*</span>
            <input className="em-input-update"
              type="text"
              name="companyName"
              id="c-auth"
              maxLength="150"
              required
              defaultValue={state.companyName}
              onChange={handleChange}
            />
            {isLoading ? 
            <div id="auth-update-spinner">{spinner}</div>
            :
            <input 
              type="submit" 
              value="Update"
              id="auth-update-submit-btn"
            />}
          </form>
          :
          <form onSubmit={(e) => handleSubmit(e, 'Password')}>
            <label htmlFor="old-pass">Old Password</label><span id="required-auth">*</span>
            <input className="em-input-update"
              type="password"
              name="oldPassword"
              id="old-pass"
              minLength="3"
              maxLength="20"
              required
              onChange={updatePasswordState}
            />
            <label htmlFor="new-pass">New Password</label><span id="required-auth">*</span>
            <input className="em-input-update"
              type="password"
              name="newPassword"
              id="new-pass"
              minLength="3"
              maxLength="20"
              required
              onChange={updatePasswordState}
            />
            <label htmlFor="retype-pass">Retype Password</label><span id="required-auth">*</span>
            <input className="em-input-update"
              type="password"
              name="retypePassword"
              id="retype-pass"
              minLength="3"
              maxLength="20"
              required
              onChange={updatePasswordState}
            />
            {isLoading ? 
            <div id="auth-update-spinner">{spinner}</div>
            : 
            <input 
              type="submit" 
              value="Update"
              id="auth-update-submit-btn"
            />}
          </form>
          }
        </Modal>
        <Toast />
      </>
    )
}