import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ApplicationReadOnlyViewer from '../ApplicationReadOnlyViewer';
const moment = require('moment')

const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="gray" size="lg" />;

export default function ModalApplicationViewer({ jobAppModal, setJobAppModal, statusText }) {

    const setStatusTextColor = (statusText) => {
        switch (statusText) {
            case 'Live' : return 'green'
            case 'Viewed': return 'blue'
            case 'Paused': return 'gray'
            default: return 'black'
        }
    }

    return (
        <div id="modal-application-viewer">
            <div className="modal-action-header">
                <div>
                    <h2>{jobAppModal.jobData.jobTitle}</h2>
                    <span>{jobAppModal.jobData.jobLocation}</span>
                </div>
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
            <section>
                <p>Status: <span style={{color: setStatusTextColor(statusText)}}>{statusText}</span></p>
                <p>Posted: {moment(jobAppModal.jobData.uploadDate).format('L')}</p>
            </section>
            <div id="modal-application-action">
                <button>Pause Application</button>
                <button
                  className="employMe-delete-btn"
                  onClick={() => {}}
                >
                  Delete Application
                </button>
            </div>
            <br />
            <ApplicationReadOnlyViewer jobAppData={jobAppModal} />
        </div>
    )
}