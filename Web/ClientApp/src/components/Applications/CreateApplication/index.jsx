import React from 'react';
import dataset from '../../../datasets/defaultJobAppQuestions.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Toast from '../../toasts';
import * as toastMethods from '../../toastMethods';
import * as api from '../../../api/jobApplications';
import CustomQuestionForm from './CustomQuestionForm';

const removeIcon = <FontAwesomeIcon icon ={faTimes} color="gray" size="lg" />;
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" />;

export default function CreateApplication({ close, closeFunc, setTriggerRefresh }) {
    const postApplication = () => {
      const defaultQuestionString = JSON.stringify(questions);
      const jobTitleVal = jobTitle.current.value;
      const jobLocationVal = jobLocation.current.value;
      if (jobTitleVal.trim() === "") {
        toastMethods.notifyError('Please fill out the job title');
        return false;
      }
      if (jobLocationVal.trim() === "") {
        toastMethods.notifyError('Please fill out the job location');
        return false;
      } 
      setButtonText(spinner);
      api.createJobApplication(jobTitleVal, jobLocationVal, defaultQuestionString, customQuestions.questions)
        .then(() => {
          setButtonText("Post Application");
          closeFunc();
          refresh();
          return toastMethods.notifySuccess('Your job application is now posted online');
        }).then(() => setTriggerRefresh(true))
        .catch((e) => {
          e.text().then((message) => {
            setButtonText("Post Application")
            return toastMethods.notifyError(message);
          })
        })
    };

    const [defaultQuestions, setDefaultQuestions] = React.useState(dataset);
    const [table, setTable] = React.useState(null);
    const [questions, setQuestions] = React.useState(dataset.map(i => {
      return {name: i.name, checked: i.required}
    }));
    const [buttonText, setButtonText] = React.useState("Post Application");
    const [customQuestions, setCustomQuestions] = React.useState({
      component: null,
      isDisabled: false,
      questions: [],
    })
    const [customQuestionRow, setCustomQuestionRow] = React.useState(null);

    const jobTitle = React.useRef();
    const jobLocation = React.useRef();

    const handleChange = (e) => {
      if(e.target.checked) {
        return setQuestions(questions.map((c) => c.name === e.target.name ? { ...c, checked: true } : c));
      }
      return setQuestions(questions.map((c) => c.name === e.target.name ? { ...c, checked: false }: c));
    }

    const refresh = () => {
      jobTitle.current.value = "";
      jobLocation.current.value = "";
      setDefaultQuestions(dataset);
      setQuestions(dataset.map(i => {
        return {name: i.name, checked: i.required}
      }));
    }

    React.useEffect(() => {
      setTable(defaultQuestions.map((q, i) => {
        return (
          <tr key={i}>
            <td className="create-app-cb">
              <input
                type="checkbox"
                name={q.name}
                className="check"
                checked={questions.filter(c => c.name === q.name)[0].checked}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <p>{q.label}</p>
            </td>
            <td style={{ border: "none", backgroundColor: "white", paddingLeft: "20px", paddingTop:"17px" }}>
              <button
                className='strip-btn'
                onClick={() => {
                  setDefaultQuestions(defaultQuestions.filter((item) => item !== q));
                  setQuestions(questions.filter((item) => item.name !== q.name));
                }}
              >
                {removeIcon}
              </button>
            </td>
          </tr>
        )
      }))
    }, [defaultQuestions, questions]);

    const parseInputType = (inputType) => {
      switch (inputType) {
        case 'shortText': return 'Short Text';
        case 'longText': return 'Long Text';
        case 'yesNo': return 'Yes/No';
        case 'number': return 'Number';
        case 'date': return 'Date';
        default: return '';
      }
    }

    React.useEffect(() => {
      setCustomQuestionRow(customQuestions.questions.map((q, i) => {
        return (
          <tr key={i}>
            <td className="create-app-cb">
              <input
                type="checkbox"
                name={q.name}
                className="check"
                checked={q.required}
                onChange={(e) => console.log(q)}
              />
            </td>
            <td
              className="custom-question-row"
              onClick={() => {
                setCustomQuestions({
                  ...customQuestions,
                  isDisabled: true,
                  component: <CustomQuestionForm
                                setCustomQuestions={setCustomQuestions}
                                customQuestions={customQuestions}
                                defaultValues={q}
                              />
                })
              }}
            >
              <p>{q.question}</p>
              <p id="answer-type-table-row">
                {`Answer Type: ${parseInputType(q.inputFieldType)}`}
              </p>
            </td>
            
            <td style={{ border: "none", backgroundColor: "white", paddingLeft: "20px", paddingTop:"17px" }}>
              <button
                className='strip-btn'
                onClick={() => console.log("Delete row")}
              >
                {removeIcon}
              </button>
            </td>
          </tr>
        )
      }))
    }, [customQuestions]);

    return(
      <>
        <div id="create-app-main">
          <div id="create-app-title">
            <h1>Create Application</h1>
            <span>
              <button onClick={refresh}>Refresh</button>
              {close}
            </span>
          </div>
          <section>
            <div id="create-app-form">
              <span>
                <label htmlFor="job-title">Job Title</label>
                <input type="text" id="job-title" ref={jobTitle} maxLength="150" />
              </span>
              <span>
                <label htmlFor="job-location">Location</label>
                <input type="text" id="job-location" ref={jobLocation} maxLength="150" />
              </span>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Required</th>
                  <th>Label / Question</th>
                </tr>
                {table}
                {customQuestionRow}
              </tbody>
            </table>
          </section>
          {customQuestions.component}
          <button
            onClick={() => setCustomQuestions({
              ...customQuestions,
              isDisabled: true,
              component: <CustomQuestionForm
                            setCustomQuestions={setCustomQuestions}
                            customQuestions={customQuestions}
                            defaultValues={null}
                          />
            })}
            disabled={customQuestions.isDisabled}
          >
            Add a Custom Question
          </button>
          <br />
          <button
            className="employMe-add-btn"
            onClick={postApplication}
            style={{
              backgroundColor: buttonText !== "Post Application" ? "transparent" : "#5bc236"
            }}
            disabled={buttonText === "Post Application" ? false : true}
          >
            {buttonText}
          </button>
        </div>
        <Toast />
      </>
    )
}
