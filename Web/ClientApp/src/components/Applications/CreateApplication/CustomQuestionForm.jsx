import React from 'react'

export default function CustomQuestionForm({ setCustomQuestions, customQuestions, defaultValues }) {
    const [answerType, setAnswerType] = React.useState();
    const [isRequired, setIsRequired] = React.useState();

    const questionRef = React.useRef();

    const addCustomQuestion = () => {
      const newCustomQuestion = {
        question: questionRef.current.value,
        inputFieldType: answerType,
        required: isRequired === "1" ? true : false,
      };
      setCustomQuestions({
        ...customQuestions,
        questions: [...customQuestions.questions, newCustomQuestion]
      })
    };

    React.useEffect(() => console.log(defaultValues), [defaultValues]);

    const closeForm = () => setCustomQuestions({ ...customQuestions, isDisabled: false, component: null });

    return (
        <div id="custom-question-form">
            <label htmlFor="custom-question">{defaultValues ? "Edit Question" : "Add Question"}</label>
            <input
              type="text"
              id="custom-question"
              maxLength="200"
              ref={questionRef}
              placeholder={defaultValues ? "" : "ex. Can you commute to work?"}
              defaultValue={defaultValues ? defaultValues.question : ""}
            />
            <br />

            <label>Answer Type</label><br />
            <input
              type="radio"
              id="shortText"
              name="answerType"
              value="shortText"
              onClick={(e) => setAnswerType(e.target.value)}
              defaultChecked={defaultValues && defaultValues.inputFieldType === "shortText"}
            />
            <label htmlFor="shortText">Text (short)</label>
            <br />
            <input
              type="radio"
              id="longText"
              name="answerType"
              value="longText"
              onClick={(e) => setAnswerType(e.target.value)}
              defaultChecked={defaultValues && defaultValues.inputFieldType === "longText"}
            />
            <label htmlFor="longText">Text (long)</label>
            <br />
            <input
              type="radio"
              id="yesNo"
              name="answerType"
              value="yesNo"
              onClick={(e) => setAnswerType(e.target.value)}
              defaultChecked={defaultValues && defaultValues.inputFieldType === "yesNo"}
            />
            <label htmlFor="yesNo">Yes/No</label>
            <br />
            <input
              type="radio"
              id="number"
              name="answerType"
              value="number"
              onClick={(e) => setAnswerType(e.target.value)}
              defaultChecked={defaultValues && defaultValues.inputFieldType === "number"}
            />
            <label htmlFor="number">Number</label>
            <br />
            <input
              type="radio"
              id="date"
              name="answerType"
              value="date"
              onClick={(e) => setAnswerType(e.target.value)}
              defaultChecked={defaultValues && defaultValues.inputFieldType === "date"}
            />
            <label htmlFor="date">Date</label>
            <br /><br />

            <label>Required</label>
            <br />
            <input
              type="radio"
              id="yes"
              name="required"
              value={1}
              onClick={(e) => setIsRequired(e.target.value)}
              defaultChecked={defaultValues && defaultValues.required}
            />
            <label htmlFor="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              name="required"
              value={0}
              onClick={(e) => setIsRequired(e.target.value)}
              defaultChecked={defaultValues && !defaultValues.required}
            />
            <label htmlFor="no">No</label>
            <br />
            <div id="custom-question-form-action">
                <button
                  className="employMe-add-btn"
                  onClick={addCustomQuestion}
                >
                  Add
                </button>
                <button
                  className="employMe-delete-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>
            </div>
        </div>
    )
}
