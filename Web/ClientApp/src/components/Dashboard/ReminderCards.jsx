import React from 'react';
import * as api from '../../api/reminders'

import '../../custom.css'
import './index.css'

export default function ReminderCards({ 
  id, message, setModalState, setRemindState 
}) {

  const [style, setStyle] = React.useState(null)

  const handleCheck = (e) => {
    console.log(e.target.value)
    setStyle({ textDecoration: 'line-through' })
  }

    return (
        <div id="reminder-card">
            <input 
              type="checkbox" 
              onChange={handleCheck}
            />
            <p 
              onClick={() => {
                setModalState({
                  isOpen: true,
                  isUpdate: true
                });
                setRemindState({ message, key: id });
              }}
              style={style}
            >
              {message}
            </p>
        </div>
    )
}
