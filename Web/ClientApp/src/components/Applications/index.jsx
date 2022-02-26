import React from 'react'
import LiveApplications from './LiveApplications'

import './index.scss'
import PausedApplications from './PausedApplications'
import ViewApplicants from './ViewApplicants'

export default function Applications() {
    return (
      <div id="main-page-wrapper">
        <div id="landing-pg-main">
          <LiveApplications />
          <ViewApplicants />
          <PausedApplications />
        </div>
      </div>
    )
}