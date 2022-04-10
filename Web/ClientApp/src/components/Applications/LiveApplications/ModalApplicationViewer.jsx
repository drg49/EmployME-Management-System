import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ApplicationReadOnlyViewer from '../ApplicationReadOnlyViewer';
import Toast from '../../../components/toasts'
import * as toastMethods from '../../../components/toastMethods'
import * as api from '../../../api/jobApplications';

const moment = require('moment')

const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="gray" size="lg" />;
const spinnerIcon = <FontAwesomeIcon icon ={faSpinner} size='sm' spin />;

export default function ModalApplicationViewer({ jobAppModal, setJobAppModal, setTriggerRefresh }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const setStatusTextColor = (statusText) => statusText === 'Live' ? 'green' : 'gray';

    const pauseApplication = (appId) => {
        setIsLoading(true)
        api.pauseApplication(appId)
            .then(() => {
                setIsLoading(false);
                setJobAppModal({ ...jobAppModal, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifySuccess('Successfully paused application')
            })
            .catch(() => {
                setIsLoading(false);
                setJobAppModal({ ...jobAppModal, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifyError('There was an error pausing your job application')
            })
    };

    return (
        <>
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
                    <p>Status: <span style={{ color: setStatusTextColor(jobAppModal.jobData.status) }}>{jobAppModal.jobData.status}</span></p>
                    <p>Posted: {moment(jobAppModal.jobData.uploadDate).format('L')}</p>
                </section>
                <div id="modal-application-action">
                    <button
                        onClick={() => pauseApplication(jobAppModal.jobData.appId)}
                        disabled={isLoading}
                    >
                        {isLoading && spinnerIcon} Pause Application
                    </button>
                    <button
                        className="employMe-delete-btn"
                        onClick={() => { } }
                    >
                        Delete Application
                    </button>
                </div>
                <br />
                <ApplicationReadOnlyViewer jobAppData={jobAppModal} />
            </div>
        
            <Toast />
        </>
    )
}