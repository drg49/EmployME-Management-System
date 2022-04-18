import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import JobAppCards from '../JobAppCards';
import * as toastMethods from '../../toastMethods';
import * as api from '.././../../api/jobApplications'
import ErrorComponent from '../../ErrorComponent';
import Modal from 'react-modal';
import ModalActionHeader from '../../ModalActionHeader';

const spinnerIcon = (size) => <FontAwesomeIcon icon={faSpinner} spin color="white" size={size} />;

export default function PausedApplications({ triggerRefresh, setTriggerRefresh}) {
    const [loadState, setLoadState] = React.useState(null);
    const [spinner, setSpinner] = React.useState(spinnerIcon("lg"));
    const [pausedJobs, setPausedJobs] = React.useState([]);
    const [modalState, setModalState] = React.useState({
        isOpen: false,
        data: {}
    });
    const [resumeIsLoading, setResumeIsLoading] = React.useState(false);
    const [deleteIsLoading, setDeleteIsLoading] = React.useState(false);
    
    React.useEffect(() => {
        setTriggerRefresh(false);
        setLoadState("Start")
        api.getCompanyJobApps("Paused")
            .then((data) => {
                setLoadState("Success")
                setPausedJobs(data)
            })
            .catch((e) => {
                setLoadState("Failed")
                setSpinner(<></>)
                toastMethods.notifyError("Failed to load paused applications");
            })
    }, [triggerRefresh])

    const mapper = pausedJobs.map((item, index) => {
        return (
            <span 
              key={index}
              id="job-app-span"
              onClick={() => {
                  setModalState({ ...modalState, isOpen: true, data: item })
              }}
            >
                <JobAppCards
                  jobTitle={item.jobTitle}
                  jobLocation={item.jobLocation}
                  uploadDate={item.uploadDate}
                />
            </span>
        )
    });

    const resumeApplication = (appId) => {
        setResumeIsLoading(true)
        api.resumeApplication(appId)
            .then(() => {
                setResumeIsLoading(false);
                setModalState({ ...modalState, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifySuccess('Successfully resumed application')
            })
            .catch(() => {
                setResumeIsLoading(false);
                setModalState({ ...modalState, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifyError('There was an error resuming your job application')
            })
    }

    const deleteApplication = (appId) => {
        setDeleteIsLoading(true)
        api.deleteApplication(appId)
            .then(() => {
                setDeleteIsLoading(false);
                setModalState({ ...modalState, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifySuccess('Successfully deleted application')
            })
            .catch(() => {
                setDeleteIsLoading(false);
                setModalState({ ...modalState, isOpen: false });
                setTriggerRefresh(true);
                toastMethods.notifyError('There was an error deleting your job application')
            })
    }

    return (
        <>
            <div className="employMe-div-box">
                <p className="employMe-div-box-title">Paused Applications</p>
                {loadState === 'Success' ? <div className="application-wrapper-scroll">{mapper}</div> : spinner}
                {loadState === 'Failed' && <ErrorComponent message="Failed to load" />}
            </div>

            <Modal
                isOpen={modalState.isOpen}
                className={"mymodal"}
                overlayClassName="myoverlay"
            >
                <ModalActionHeader
                    title={modalState.data.jobTitle}
                    onClose={() => setModalState({...modalState, isOpen: false})}
                    headerStyling={{marginBottom: '21px'}}
                    titleStyling={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '270px'
                    }}
                />
                <div id="pause-modal-footer">
                    <button
                        className='employMe-add-btn'
                        onClick={() => resumeApplication(modalState.data.appId)}
                        disabled={resumeIsLoading || deleteIsLoading}
                    >
                        {resumeIsLoading && spinnerIcon('sm')} Resume Application
                    </button>
                    <button
                        className='employMe-delete-btn'
                        onClick={() => deleteApplication(modalState.data.appId)}
                        disabled={resumeIsLoading || deleteIsLoading}
                    >
                        {deleteIsLoading && spinnerIcon('sm')} Delete Permanently
                    </button>
                </div>
            </Modal>
        </>
    )
}