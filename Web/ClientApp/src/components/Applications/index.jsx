import React from 'react'
import CurrentApplications from './CurrentApplications'

import './index.scss'
import PausedApplications from './PausedApplications'
import ViewApplicants from './ViewApplicants'

export default function Applications() {
    return (
      <div id="main-page-wrapper">
        <div id="landing-pg-main">
          <CurrentApplications />
          <ViewApplicants />
          <PausedApplications />
        </div>
      </div>
    )
}