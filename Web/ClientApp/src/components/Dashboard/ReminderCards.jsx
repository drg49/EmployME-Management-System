import React from 'react';
import * as api from '../../api/reminders'
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/reminderStore";

import '../../custom.css'
import './index.css'

export default function ReminderCards({ 
  id, message, checkStatus, setModalState, setRemindState, initLoad, setInitLoad 
}) {
  const dispatch = useDispatch();
  const state = useSelector(state => state.reminders)

  React.useEffect(() => {
    if (checkStatus === 1 && initLoad.reminders === true) {
      dispatch(actions.addCheck(id))
    }
  }, [])

  const handleCheck = (e) => {
    if (e.target.checked) {
      api.updateReminderCheck(id, 1)
      return dispatch(actions.addCheck(id))
    }
    api.updateReminderCheck(id, 0)
    setInitLoad({...initLoad, reminders: false})
    return dispatch(actions.removeCheck(id))
  }

    return (
        <div id="reminder-card">
            <input 
              type="checkbox" 
              onChange={handleCheck}
              checked={state.checked.includes(id) ? true : false}
            />
            <p 
              onClick={() => {
                setModalState({
                  isOpen: true,
                  isUpdate: true
                });
                setRemindState({ message, key: id });
              }}
              style={state.checked.includes(id) ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
            >
              {message}
            </p>
        </div>
    )
}
