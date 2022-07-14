import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import ApplicationReadOnlyViewer from '../ApplicationReadOnlyViewer';
import Toast from '../../../components/toasts'
import * as toastMethods from '../../../components/toastMethods'
import * as api from '../../../api/jobApplications';
import ModalActionHeader from '../../ModalActionHeader';

const moment = require('moment')

const spinnerIcon = <FontAwesomeIcon icon ={faSpinner} size='sm' spin />;

export default function ModalApplicationViewer({ jobAppModal, setJobAppModal, setTriggerRefresh }) {
    const [isPauseLoading, setIsPauseLoading] = React.useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);

    const setStatusTextColor = (statusText) => statusText === 'Live' ? 'green' : 'gray';

    const pauseApplication = (appId) => {
        setIsPauseLoading(true)
        api.pauseApplication(appId)
            .then(() => {
                setIsPauseLoading(false);
                setJobAppModal({ ...jobAppModal, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifySuccess('Successfully paused application')
            })
            .catch(() => {
                setIsPauseLoading(false);
                setJobAppModal({ ...jobAppModal, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifyError('There was an error pausing your job application')
            })
    }

    const deleteApplication = (appId) => {
        setIsDeleteLoading(true);
        api.deleteApplication(appId)
            .then(() => {
                setIsDeleteLoading(false);
                setJobAppModal({ ...jobAppModal, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifySuccess('Successfully deleted application')
            })
            .catch(() => {
                setIsDeleteLoading(false);
                setJobAppModal({ ...jobAppModal, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifyError('There was an error deleting your job application')
            })
    }

    return (
        <>
            <div id="modal-application-viewer">
                <ModalActionHeader
                    title={<>
                             {jobAppModal.jobData.jobTitle}<br/>
                             <span style={{fontSize: '16px', color: 'black', fontWeight: 'lighter'}}>
                                {jobAppModal.jobData.jobLocation}
                             </span>
                           </>}
                    onClose={() => setJobAppModal({isOpen: false, jobData: {}})}
                    closeBtnSize='lg'
                />
                <section>
                    <p>Status: <span style={{ color: setStatusTextColor(jobAppModal.jobData.status) }}>{jobAppModal.jobData.status}</span></p>
                    <p>Posted: {moment(jobAppModal.jobData.uploadDate).format('L')}</p>
                </section>
                <div id="modal-application-action">
                    <button
                        onClick={() => pauseApplication(jobAppModal.jobData.appId)}
                        disabled={isPauseLoading || isDeleteLoading}
                    >
                        {isPauseLoading && spinnerIcon} Pause Application
                    </button>
                    <button
                        className="employMe-delete-btn"
                        onClick={() => deleteApplication(jobAppModal.jobData.appId)}
                        disabled={isPauseLoading || isDeleteLoading}
                        >
                        {isDeleteLoading && spinnerIcon} Delete Application
                    </button>
                </div>
                <br />
                <span id="description">Description:</span>
                <p>{jobAppModal.jobData.description}</p>
                <ApplicationReadOnlyViewer jobAppData={jobAppModal} />
            </div>
        
            <Toast />
        </>
    )
}