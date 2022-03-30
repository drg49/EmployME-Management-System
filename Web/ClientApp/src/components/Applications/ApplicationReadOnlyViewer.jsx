import React from 'react';

export default function ApplicationReadOnlyViewer({ jobAppData }) {
  const [formQuestions, setFormQuestions] = React.useState(null);

  React.useEffect(() => {
    setFormQuestions(jobAppData.customAppQuestions.map((item, index) => {
      return (
        <div key={index}>
          <p>{item.question}</p>
          {parseCustomQuestion(item.inputFieldType, item.required, index)}
        </div>
      )
    }))
  }, []);
  
  const yesNoField = (index) => (
    <div id="yesNo-input-field">
      <input type="radio" name={index} id="yes" value="yes"/>
      <label htmlFor="yes">Yes</label>
      <br />
      <input type="radio" name={index} id="no" value="no"/>
      <label htmlFor="no">No</label>
    </div>
  )

  const parseCustomQuestion = (inputType, isRequired, index) => {
    switch (inputType) {
      case 'shortText': return <input type="text" required={isRequired} />;
      case 'longText': return <textarea required={isRequired} />;
      case 'yesNo': return yesNoField(index);
      case 'number': return <input type="number" required={isRequired} />;
      case 'date': return <input type="date" required={isRequired} />;
      default: return <input type="text" />;
    }
  }

  return (
    <>
      {formQuestions}
    </>
  )
}
