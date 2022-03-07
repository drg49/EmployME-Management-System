import React from 'react';
import Drawer from 'rc-drawer';
import CreateApplication from '../CreateApplication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as jobApi from '../../../api/jobApplications';
import JobAppCards from './JobAppCards';
import Toast from '../../toasts';
import * as toastMethods from '../../toastMethods';
import ErrorComponent from '../../ErrorComponent';
import Modal from 'react-modal';
import ModalApplicationViewer from './ModalApplicationViewer';

const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="gray" size="lg" />;
const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spin color="white" />;

export default function LiveApplications() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [loadState, setLoadState] = React.useState(null);
    const [jobAppData, setJobAppData] = React.useState([]);
    const [triggerRefresh, setTriggerRefresh] = React.useState(false);
    const [spinner, setSpinner] = React.useState(spinnerIcon);
    const [jobAppModal, setJobAppModal] = React.useState({
        isOpen: false,
        jobData: {},
    });

    React.useEffect(() => {
        setTriggerRefresh(false);
        setLoadState("Start")
        jobApi.getCompanyJobApps()
            .then((data) => {
                setLoadState("Success")
                setJobAppData(data)
            })
            .catch((e) => {
                setLoadState("Failed")
                setSpinner(<></>)
                toastMethods.notifyError("Failed to load job applications");
            })
    }, [triggerRefresh]) /* Remember, this useEffect block will be called every time the value in the array changes. 
    Therefore, this code will be called everytime the state changes for triggerRefresh */

    const mapper = jobAppData.map((j, i) => {
        return (
            <span 
              key={i}
              id="job-app-span"
              onClick={() => {
                setJobAppModal({
                    isOpen: true,
                    jobData: j,
                });
                console.log(j);
              }}
            >
                <JobAppCards
                jobTitle={j.jobTitle}
                jobLocation={j.jobLocation}
                uploadDate={j.uploadDate}
                />
            </span>
        )
    });

    return (
        <>
            <div
              className="employMe-div-box"
              style={jobAppData.length > 0 ? {"borderBottomLeftRadius": "0px", "borderBottomRightRadius": "0px"} : null}
            >
                <div className="employMe-div-box-action">
                    <p className="employMe-div-box-title">Live Applications</p>
                    <button
                      className="employMe-add-btn"
                      onClick={() => setIsOpen(true)}
                    >
                      Create
                    </button>
                </div>
                  {loadState === 'Success' ? <div id="live-application-wrapper">{mapper}</div> : spinner}
                  {loadState === 'Failed' && <ErrorComponent message="Failed to load reminders"/>}
            </div>
            <Drawer
                open={isOpen}
                width="50vw"
                handler={false}
                level={null}
                autoFocus={false}
                showMask={true}
                maskClosable={true}
                onClose={() => setIsOpen(false)}
                placement="right"
                contentWrapperStyle={{
                    background: 'white'
                }}
                maskStyle={{
                    opacity: "0.5"
                }}
            >
                <CreateApplication 
                  close={<button 
                    onClick={() => setIsOpen(false)}
                  >
                    {closeIcon}
                  </button>}
                  closeFunc={() => setIsOpen(false)}
                  setTriggerRefresh={setTriggerRefresh}
                />
            </Drawer>
            <Modal
              isOpen={jobAppModal.isOpen}
              className="mymodal"
              overlayClassName="myoverlay"
            >
                <ModalApplicationViewer
                    jobAppModal={jobAppModal}
                    setJobAppModal={setJobAppModal}
                />
            </Modal>
            <Toast/>
        </>
    )
}