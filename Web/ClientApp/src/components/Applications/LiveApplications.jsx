import React from 'react';
import Drawer from 'rc-drawer';
import CreateApplication from './CreateApplication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import * as jobApi from '../../api/jobApplications';
import JobAppCards from './JobAppCards';
import Toast from '../../components/toasts';
import * as toastMethods from '../../components/toastMethods';

const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="gray" size="lg" />

export default function LiveApplications() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [loadState, setLoadState] = React.useState(null);
    const [jobAppData, setJobAppData] = React.useState([]);
    const [triggerRefresh, setTriggerRefresh] = React.useState(false);

    React.useEffect(() => {
        setLoadState("Start")
        jobApi.getCompanyJobApps()
            .then((data) => {
                setLoadState("Success")
                setJobAppData(data)
            })
            .catch((e) => {
                setLoadState("Failed")
                toastMethods.notifyError("Failed to load job applications");
            })
    }, [triggerRefresh]) /* Remember, this useEffect block will be called every time the value in the array changes. 
    Therefore, this code will be called everytime the state changes for triggerRefresh */
    React.useEffect(() => console.log(666, loadState), [loadState]);

    const mapper = jobAppData.map((j, i) => {
        return (
            <JobAppCards
              key={i}
              jobTitle={j.jobTitle}
              jobLocation={j.jobLocation}
              uploadDate={j.uploadDate}
            />
        )
    })

    return (
        <>
            <div className="employMe-div-box" >
                <div className="employMe-div-box-action">
                    <p className="employMe-div-box-title">Live Applications</p>
                    <button
                      className="employMe-add-btn"
                      onClick={() => setIsOpen(true)}
                    >
                      Create
                    </button>
                </div>
                {mapper}
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
                width="64vw"
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
            <Toast/>
        </>
    )
}