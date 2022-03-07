import React from 'react'

export default function CustomQuestionForm() {

    return (
        <div id="custom-question-form">
            <label htmlFor="custom-question">Question</label>
            <input
              type="text"
              id="custom-question"
              maxLength="200"
            />
            <br />

            <label>Answer Type</label><br />
            <input
              type="radio"
              id="shortText"
              name="answerType"
              value="shortText"
            />
            <label htmlFor="shortText">Text (short)</label>
            <br />
            <input
              type="radio"
              id="longText"
              name="answerType"
              value="longText"
            />
            <label htmlFor="longText">Text (long)</label>
            <br />
            <input
              type="radio"
              id="yesNo"
              name="answerType"
              value="yesNo"
            />
            <label htmlFor="yesNo">Yes/No</label>
            <br />
            <input
              type="radio"
              id="number"
              name="answerType"
              value="number"
            />
            <label htmlFor="number">Number</label>
            <br />
            <input
              type="radio"
              id="date"
              name="answerType"
              value="date"
            />
            <label htmlFor="date">Date</label>
            <br /><br />

            <label>Required</label>
            <br />
            <input
              type="radio"
              id="yes"
              name="required"
              value="yes"
            />
            <label htmlFor="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              name="required"
              value="no"
            />
            <label htmlFor="no">No</label>

            <br />
            <div id="custom-question-form-action">
                <button className="employMe-add-btn">Add</button>
                <button className="employMe-delete-btn">Cancel</button>
            </div>
        </div>
    )
}
