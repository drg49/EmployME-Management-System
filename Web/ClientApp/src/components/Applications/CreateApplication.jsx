import React from 'react';
import questions from '../../datasets/defaultJobAppQuestions.json'

const defaultQuestions = questions.map((q) => {
  return (
    <tr>
      <td className="create-app-cb">
       <input type="checkbox" name="switch" class="check" checked={q.askFor}/>
      </td>
      <td className="create-app-cb">
       <input type="checkbox" name="switch" class="check" checked={q.required}/>   
      </td>
      <td>
        <p>{q.label}</p>
      </td>
    </tr>
  )
})

export default function CreateApplication({close}) {
    return(
      <div id="create-app-main">
        <div id="create-app-title">
          <h1>Create Application</h1>
          {close}
        </div>
        <section>
          <label htmlFor="job-title">Job Title</label>
          <input type="text" id="job-title" />
          <table>
            <tr>
              <th>Ask For</th>
              <th>Required</th>
              <th>Label / Question</th>
            </tr>
            {defaultQuestions}
          </table>
        </section>
        <button className="employMe-add-btn">Post Application</button>
      </div>
    )
}
