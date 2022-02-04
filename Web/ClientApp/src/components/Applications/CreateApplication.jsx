import React from 'react';
import questions from '../../datasets/defaultJobAppQuestions.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const removeIcon = <FontAwesomeIcon icon ={faTimes} color="gray" size="lg" />

export default function CreateApplication({close}) {
    const [defaultQuestions, setDefaultQuestions] = React.useState(questions)
    const [table, setTable] = React.useState(null);
    const [check, setCheck] = React.useState(questions.map(i => {
      return {name: i.name, checked: i.required}
    }))

    const jobTitle = React.useRef();

    const handleChange = (e) => {
      if(e.target.checked) {
        return setCheck(check.map((c) => c.name === e.target.name ? { ...c, checked: true } : c));
      }
      return setCheck(check.map((c) => c.name === e.target.name ? { ...c, checked: false }: c));
    }

    const refresh = () => {
      setDefaultQuestions(questions);
      setCheck(questions.map(i => {
        return {name: i.name, checked: i.required}
      }))
    }

    const postApplication = () => {
      //send both of these to server
      console.log(check);
      console.log(jobTitle.current.value);
    }

    React.useEffect(() => {
      setTable(defaultQuestions.map((q) => {
        return (
          <tr>
            <td className="create-app-cb">
            <input
              type="checkbox"
              name={q.name}
              class="check"
              checked={check.filter(c => c.name === q.name)[0].checked}
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
                  setCheck(check.filter((item) => item.name !== q.name));
                }}
              >
                {removeIcon}
              </button>
            </td>
          </tr>
        )
      }))
    }, [defaultQuestions, check]);

    return(
      <div id="create-app-main">
        <div id="create-app-title">
          <h1>Create Application</h1>
          {close}
        </div>
        <section>
          <div id="create-app-header-flex">
            <div>
              <label htmlFor="job-title">Job Title</label>
              <input type="text" id="job-title" ref={jobTitle} />
            </div>
            <button onClick={refresh}>Refresh</button>
          </div>
          <table>
            <tr>
              <th>Required</th>
              <th>Label / Question</th>
            </tr>
            {table}
          </table>
        </section>
        <button
          className="employMe-add-btn"
          onClick={postApplication}
        >
          Post Application
        </button>
      </div>
    )
}
