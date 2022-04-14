import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const closeIcon = (size) => <FontAwesomeIcon icon ={faWindowClose} size={size} />

export default function ModalActionHeader({ title, onClose, headerStyling, titleStyling, closeBtnSize }){

  return (
    <div className="modal-action-header" style={headerStyling}>
      <h2 style={titleStyling}>
        {title}
      </h2>
      <button
        onClick={onClose}
        className="strip-btn close-btn"
      >
        {closeIcon(closeBtnSize)}
      </button>
    </div>
  )
}