import React from 'react'
import LiveApplications from './LiveApplications'
import PausedApplications from './PausedApplications'
import ViewApplicants from './ViewApplicants'

import './index.scss'

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