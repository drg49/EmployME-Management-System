import React from 'react';
import * as api from '../../api/reminders'

import '../../custom.css'
import './index.css'

export default function ReminderCards({ 
  id, message, checkStatus, setModalState, setRemindState, checkedReminders, setCheckedReminders 
}) {

  // const [style, setStyle] = React.useState(null)

  React.useEffect(() => {
    if (checkStatus === 1) {
      setCheckedReminders((checkedReminders) => [...checkedReminders, id])
    }
  }, [])

  const handleCheck = (e) => {
    if (e.target.checked) {
      api.updateReminderCheck(id, 1)
      return setCheckedReminders((checkedReminders) => [...checkedReminders, id])
    }
    api.updateReminderCheck(id, 0)
    const removedCheck = checkedReminders.filter((c) => c !== id)
    return setCheckedReminders(removedCheck)
  }

    return (
        <div id="reminder-card">
            <input 
              type="checkbox" 
              onChange={handleCheck}
              checked={checkedReminders.includes(id) ? true : false}
            />
            <p 
              onClick={() => {
                setModalState({
                  isOpen: true,
                  isUpdate: true
                });
                setRemindState({ message, key: id });
              }}
              style={checkedReminders.includes(id) ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
            >
              {message}
            </p>
        </div>
    )
}
