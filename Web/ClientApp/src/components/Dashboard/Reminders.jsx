import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowClose, faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import * as reminderApi from '../../api/reminders'
import '../../custom.css';
import './index.css';
import ReminderCards from "./ReminderCards";

const addIcon = <FontAwesomeIcon icon={faPlus} />
const closeIcon = <FontAwesomeIcon icon ={faWindowClose} />
const errorIcon = <FontAwesomeIcon icon={faExclamationTriangle} />
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" />
const error = <div style={{color: 'red'}}>{errorIcon} Failed to add reminder</div>

Modal.setAppElement('#root');

export default function Reminders() {
    const [modalState, setModalState] = React.useState({
      isOpen: false,
      isUpdate: false,
    });
    const [remindState, setRemindState] = React.useState({
      message: '',
      key: 0,
    });
    const [isLoading, setIsLoading] = React.useState(false);

    const getReminders = () => {
      reminderApi.getReminders()
      .then((data) => setReminders(data.reverse().map((n, index) => {
        return (
          <div id="reminder-card-wrapper" key={index}>
            <ReminderCards
              id={n.reminderKey}
              message={n.reminderMessage}
              setModalState={setModalState}
              setRemindState={setRemindState}
            />
          </div>
        )
      })))
      .catch(() => setReminders(<p style={{color: 'red'}}>{errorIcon} Failed to load reminders</p>))
    }

    const resetStates = () => {
      setModalState({ isOpen: false, isUpdate: false });
      setRemindState({ message: '', key: 0 });
      setIsLoading(false);
      getReminders();
    }

    const createReminder = () => {
      reminderApi.createReminder(remindState.message).then(() => {
        resetStates();
      }).catch(() => console.log('ERROR'))
    }

    const updateReminder = () => {
      reminderApi.updateReminder(remindState.message, remindState.key).then(() => {
        resetStates();
      }).catch(() => console.log('ERROR'))
    }

    const [reminders, setReminders] = React.useState(null);

    React.useEffect(() => {
      getReminders();
    }, [])

    const handleChange = (e) => {
      setRemindState({ ...remindState, message: e.target.value })
    }

    return (
        <>
            <div className="employMe-div-box reminder">
                <div id="reminder-actions">
                <p className="employMe-div-box-title">Reminders</p>
                <button
                  className="employMe-add-btn"
                  onClick={() => setModalState({isOpen: true, isUpdate: false})}
                >
                  {addIcon}
                </button>
                </div>
                <div id="dashboard-panel">
                  {reminders}
                </div>
            </div>

            <Modal
              isOpen={modalState.isOpen}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
            >
              <div id="modal-action-header">
                <h2>New Reminder</h2>
                <button
                  onClick={() => {
                    setModalState({isOpen: false, isUpdate: false});
                  }}
                  className="strip-btn close-btn"
                >
                  {closeIcon}
                </button>
              </div>
              <textarea 
                maxLength="500"
                onChange={(e) => handleChange(e)} 
                value={remindState.message}
              />
              {isLoading ? 
              spinner 
              : 
              <button 
                className="employMe-add-btn"
                onClick={() => {
                  setIsLoading(true);
                  if (modalState.isUpdate) {
                    return updateReminder();
                  }
                  return createReminder();
                }}
              >
                Done
              </button>}
            </Modal>
        </>
    )
}