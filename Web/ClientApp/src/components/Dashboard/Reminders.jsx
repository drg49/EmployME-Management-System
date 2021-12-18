import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowClose, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import * as reminderApi from '../../api/reminders'
import ReminderCards from "./ReminderCards";
import useReminders from "../../hooks/useReminders";
import ErrorComponent from "../ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/reminderStore";
import '../../custom.css';
import './index.css';
import Toast from "../toasts";
import * as toastMethods from "../toastMethods"

const addIcon = <FontAwesomeIcon icon={faPlus} />
const closeIcon = <FontAwesomeIcon icon ={faWindowClose} />
const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" />
const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />

Modal.setAppElement('#root');

export default function Reminders({ initLoad, setInitLoad }) {
    const dispatch = useDispatch()
    const state = useReminders();
    const reminderChecks = useSelector(state => state.reminders)

    const [modalState, setModalState] = React.useState({
      isOpen: false,
      isUpdate: false,
    });
    
    const [deleteModal, setDeleteModal] = React.useState({
      isOpen: false,
    })

    const [remindState, setRemindState] = React.useState({
      message: '',
      key: 0,
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const resetStates = () => {
      setModalState({ isOpen: false, isUpdate: false });
      setDeleteModal({ isOpen: false })
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
            initLoad={initLoad}
            setInitLoad={setInitLoad}
          />
        </div>
      )})

    const createReminder = () => {
      reminderApi.createReminder(remindState.message).then(() => {
        resetReminders();
        toastMethods.notifySuccess("Reminder added")
      }).catch(() => toastMethods.notifyError("Failed to create reminder"));
    }

    const updateReminder = () => {
      reminderApi.updateReminder(remindState.message, remindState.key).then(() => {
        resetReminders();
        toastMethods.notifySuccess("Reminder updated")
      }).catch(() => toastMethods.notifyError("Failed to update reminder"));
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

    const deleteReminders = () => {
      const remindersToDelete = [...new Set(reminderChecks.checked)];
      reminderApi.deleteReminders(remindersToDelete).then(() => {
        dispatch(actions.resetChecks())
        resetReminders();
        toastMethods.notifySuccess("Your completed reminders have been deleted")
      }).catch(() => toastMethods.notifyError("Failed to delete reminders"))
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
                    {state.reminders.length > 0 ? <button
                      className="employMe-delete-btn"
                      onClick={() => setDeleteModal({...deleteModal, isOpen: true})}
                    >
                      {trashIcon}
                    </button> : null}
                  </section>
                </div>
                  {state.loadingStatus === 'started' ? spinner : <div id="dashboard-panel">{mapper}</div>}
                  {state.loadingStatus === 'failed' && <ErrorComponent message="Failed to load reminders"/>}
            </div>

            <Modal
              isOpen={modalState.isOpen}
              className="mymodal"
              overlayClassName="myoverlay"
            >
              <div id="modal-action-header">
                <h2>{modalState.isUpdate ? 'Update Reminder' : 'New Reminder'}</h2>
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

            <Modal
              isOpen={deleteModal.isOpen}
              className="mymodal"
              overlayClassName="myoverlay"
            >
              <div id="modal-action-header">
                <h2>Delete Reminders</h2>
                <button
                  onClick={() => setDeleteModal({...deleteModal, isOpen: false})}
                  className="strip-btn close-btn"
                >
                  {closeIcon}
                </button>
              </div>
              {reminderChecks.checked.length > 0 ? 
              <p>Are you sure you want to delete all completed reminders?</p>
              :
              <p>To delete reminders, you must check them off first</p>}
              {reminderChecks.checked.length > 0 ?
              <section className="modal-action-btns">
                <button
                  onClick={deleteReminders}
                  className="employMe-add-btn"
                >
                  Yes
                </button>
                <button
                  onClick={resetStates}
                  className="employMe-delete-btn"
                >
                  No
                </button>
              </section>
              :
              <button
                  onClick={resetStates}
                  className="employMe-add-btn"
                >
                  Okay
              </button>}
            </Modal>

            <Toast />
        </>
    )
}