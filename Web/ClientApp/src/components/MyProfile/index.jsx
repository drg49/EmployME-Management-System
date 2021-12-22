import React from 'react'
import Modal from 'react-modal'
import Toast from "../toasts";
import * as toastMethods from "../toastMethods";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons'

import '../../auth/auth.scss'
import './index.scss'
const moment = require('moment')
const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
const closeIcon = <FontAwesomeIcon icon ={faWindowClose} />

export default function MyProfile () {
    const state = useSelector(state => state.user);

    const [modalState, setModalState] = React.useState({
      isOpen: false,
      isUserUpdate: false,
      isPasswordChange: false,
    })

    const handleUpdate = () => {
      setModalState({ isOpen: true, isUserUpdate: true });
    }

    React.useEffect(() => console.log(modalState))

    const preventSpace = (e) => {
      if (e.key === " ") {
          e.preventDefault();
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
        </div>

        <Modal 
          isOpen={modalState.isOpen}
          className="mymodal"
          overlayClassName="myoverlay"
        >
          <div id="modal-action-header">
            <h2>{modalState.isUserUpdate ? 'Update User' : 'Change Password'}</h2>
            <button
              onClick={() => setModalState({ isOpen: false })}
              className="strip-btn close-btn"
            >
              {closeIcon}
            </button>
          </div>
          {modalState.isUserUpdate ? 
          <form>
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
                />
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
            />
          </form>
          :
          null}
        </Modal>
      </>
    )
}