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

export default function PausedApplications() {
    const [triggerRefresh, setTriggerRefresh] = React.useState(false);
    const [loadState, setLoadState] = React.useState(null);
    const [spinner, setSpinner] = React.useState(spinnerIcon("lg"));
    const [pausedJobs, setPausedJobs] = React.useState([]);
    const [modalState, setModalState] = React.useState({
        isOpen: false,
        data: {}
    });
    
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
                        onClick={() => console.log('Resume application')}
                    >
                        Resume Application
                    </button>
                    <button
                        className='employMe-delete-btn'
                        onClick={() => console.log('Delete Application')}
                    >
                        Delete Permanently
                    </button>
                </div>
            </Modal>
        </>
    )
}