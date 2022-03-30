import React from 'react';
import * as parser from './defaultQuestionParser';

export default function ApplicationReadOnlyViewer({ jobAppData }) {
  const [formQuestions, setFormQuestions] = React.useState(null);

  React.useEffect(() => console.log(JSON.parse(jobAppData.jobData.defaultQuestions)), []);

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

  const parseCustomQuestion = (inputType, isRequired, index) => {
    switch (inputType) {
      case 'shortText': return <input type="text" required={isRequired} />;
      case 'longText': return <textarea required={isRequired} />;
      case 'yesNo': return parser.yesNoField(index);
      case 'number': return <input type="number" required={isRequired} />;
      case 'date': return <input type="date" required={isRequired} />;
      default: return <input type="text" />;
    }
  };

  return (
    <div id="app-view-form-questions">
      {formQuestions}
    </div>
  )
}
