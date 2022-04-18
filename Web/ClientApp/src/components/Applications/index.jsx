import React from 'react'
import LiveApplications from './LiveApplications'
import PausedApplications from './PausedApplications'
import ViewApplicants from './ViewApplicants'

import './index.scss'

export default function Applications() {
  const [triggerRefresh, setTriggerRefresh] = React.useState(false);

    return (
      <div id="main-page-wrapper">
        <div id="landing-pg-main">
          <LiveApplications triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh} />
          <ViewApplicants />
          <PausedApplications triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh} />
        </div>
      </div>
    )
}