import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowClose, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import * as reminderApi from '../../api/reminders'
import ReminderCards from "./ReminderCards";
import useReminders from "../../hooks/useReminders";
import ErrorComponent from "../ErrorComponent";
import { useDispatch } from "react-redux";
import { actions } from "../../store/reminderStore";
import '../../custom.css';
import './index.css';

const addIcon = <FontAwesomeIcon icon={faPlus} />
const closeIcon = <FontAwesomeIcon icon ={faWindowClose} />
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" />
const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />

Modal.setAppElement('#root');

export default function Reminders() {
    const dispatch = useDispatch()
    const state = useReminders();

    const [modalState, setModalState] = React.useState({
      isOpen: false,
      isUpdate: false,
    });

    const [remindState, setRemindState] = React.useState({
      message: '',
      key: 0,
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const resetStates = () => {
      setModalState({ isOpen: false, isUpdate: false });
      setRemindState({ message: '', key: 0 });
      setIsLoading(false);
    }

    const mapper = state.reminders.map((n, index) => {
      return (
        <div id="reminder-card-wrapper" key={index}>
          <ReminderCards
            id={n.reminderKey}
            message={n.reminderMessage}
            checkStatus={n.checkStatus}
            setModalState={setModalState}
            setRemindState={setRemindState}
          />
        </div>
      )})

    const createReminder = () => {
      reminderApi.createReminder(remindState.message).then(() => {
        resetReminders();
      }).catch(() => console.log('ERROR'));
    }

    const updateReminder = () => {
      reminderApi.updateReminder(remindState.message, remindState.key).then(() => {
        resetReminders();
      }).catch(() => console.log('ERROR'));
    }

    const resetReminders = () => {
      reminderApi.getReminders()
      .then((data) => {
        dispatch(actions.resetReminders(data.reverse()));
        resetStates();
      });
    }

    const handleChange = (e) => {
      setRemindState({ ...remindState, message: e.target.value })
    }

    return (
        <>
            <div className="employMe-div-box reminder">
                <div id="reminder-actions">
                  <p className="employMe-div-box-title">Reminders</p>
                  <section>
                    <button
                      className="employMe-add-btn"
                      onClick={() => setModalState({isOpen: true, isUpdate: false})}
                    >
                      {addIcon}
                    </button>
                    <button
                      className="employMe-delete-btn"
                      onClick={() => console.log('Alan is a bum')}
                    >
                      {trashIcon}
                    </button>
                  </section>
                </div>
                  {state.loadingStatus === 'started' ? spinner : <div id="dashboard-panel">{mapper}</div>}
                  {state.loadingStatus === 'failed' && <ErrorComponent message="Failed to load reminders"/>}
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
                  onClick={resetStates}
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