import React from 'react';
import dataset from '../../../datasets/defaultJobAppQuestions.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Toast from '../../toasts';
import * as toastMethods from '../../toastMethods';
import * as api from '../../../api/jobApplications';
import CustomQuestionForm from './CustomQuestionForm';

const removeIcon = <FontAwesomeIcon icon ={faTimes} color="gray" size="lg" />;
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="lg"/>;

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
      setButton(spinner);
      api.createJobApplication(jobTitleVal, jobLocationVal, defaultQuestionString)
        .then(() => {
          setButton(defaultButton);
          closeFunc();
          refresh();
          return toastMethods.notifySuccess('Your job application is now posted online');
        }).then(() => setTriggerRefresh(true))
        .catch((e) => {
          e.text().then((message) => {
            setButton(defaultButton)
            return toastMethods.notifyError(message);
          })
        })
    };
    const defaultButton = <button className="employMe-add-btn" onClick={postApplication}>Post Application</button>;
    const [defaultQuestions, setDefaultQuestions] = React.useState(dataset);
    const [table, setTable] = React.useState(null);
    const [questions, setQuestions] = React.useState(dataset.map(i => {
      return {name: i.name, checked: i.required}
    }));
    const [button, setButton] = React.useState(defaultButton);
    const [customQuestionForm, setCustomQuestionForm] = React.useState(null)

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

    return(
      <>
        <div id="create-app-main">
          <div id="create-app-title">
            <h1>Create Application</h1>
            {close}
          </div>
          <section>
            <div id="create-app-header-flex">
              <div>
                <span>
                  <label htmlFor="job-title">Job Title</label>
                  <input type="text" id="job-title" ref={jobTitle} maxLength="150" />
                </span>
                <span>
                  <label htmlFor="job-location">Location</label>
                  <input type="text" id="job-location" ref={jobLocation} maxLength="150" />
                </span>
              </div>
              <button onClick={refresh}>Refresh</button>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Required</th>
                  <th>Label / Question</th>
                </tr>
                {table}
              </tbody>
            </table>
          </section>
          {customQuestionForm}
          <button
            onClick={() => setCustomQuestionForm(<CustomQuestionForm />)}
          >
            Add a Custom Question
          </button>
          <br />
          {button}
        </div>
        <Toast />
      </>
    )
}
