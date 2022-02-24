import React from 'react';
const moment = require('moment')

export default function JobAppCards({ jobTitle, jobLocation, uploadDate }) {
    return (
        <div className="job-app-card">
          <section>
            <p>{jobTitle}</p>
            <p>{jobLocation}</p>
          </section>
          <p>{moment(uploadDate).format('L')}</p>
        </div>
    )
}