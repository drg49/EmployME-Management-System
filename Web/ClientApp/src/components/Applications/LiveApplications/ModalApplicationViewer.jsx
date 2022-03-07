import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="gray" size="lg" />;

export default function ModalApplicationViewer({ jobAppModal, setJobAppModal }) {
    
    return (
        <div id="modal-action-header">
            <h2>{jobAppModal.jobData.jobTitle}</h2>
            <button
                onClick={() => setJobAppModal({
                    isOpen: false,
                    jobData: {}
                })}
                className="strip-btn close-btn"
            >
              {closeIcon}    
            </button>
        </div>
    )
}