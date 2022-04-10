import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Toast from '../../toasts';
import JobAppCards from '../JobAppCards';
import * as toastMethods from '../../toastMethods';
import * as api from '.././../../api/jobApplications'
import ErrorComponent from '../../ErrorComponent';

const spinnerIcon = (size) => <FontAwesomeIcon icon={faSpinner} spin color="white" size={size} />;

export default function PausedApplications() {
    const [triggerRefresh, setTriggerRefresh] = React.useState(false);
    const [loadState, setLoadState] = React.useState(null);
    const [spinner, setSpinner] = React.useState(spinnerIcon("lg"));
    const [pausedJobs, setPausedJobs] = React.useState([]);
    
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
              onClick={() => console.log(item)}
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
        <div className="employMe-div-box" >
            <p className="employMe-div-box-title">Paused Applications</p>
            {loadState === 'Success' ? <div className="application-wrapper-scroll">{mapper}</div> : spinner}
            {loadState === 'Failed' && <ErrorComponent message="Failed to load"/>}
        </div>

    )
}