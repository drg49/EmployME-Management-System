import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const errorIcon = <FontAwesomeIcon icon={faExclamationTriangle} />

export default function ErrorComponent({ message }) {
    return (
        <p style={{color: 'red'}}>{errorIcon} {message}</p>
    )
}