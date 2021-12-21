import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import './index.scss'
const moment = require('moment')
const editIcon = <FontAwesomeIcon icon={faPencilAlt} />

export default function MyProfile () {
    const state = useSelector(state => state.user);

    React.useEffect(() => console.log(state), [])

    return (
        <div id="my-profile-container">
          <div>
            <h1>{state.firstName} {state.lastName}</h1>
            <button className='strip-btn'>{editIcon}</button>
          </div>
          <p>Company: <span>{state.companyName}</span></p>
          <p>Username: <span>{state.username}</span></p>
          <p>Joined: <span>{moment(state.joinedDate).format('MMMM DD, YYYY')}</span></p>
        </div>
    )
}