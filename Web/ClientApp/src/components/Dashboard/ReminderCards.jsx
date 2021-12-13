import React from 'react';

import './index.css'

export default function ReminderCards({id, message, setModalState, setRemindState}) {
    return (
        <div id="reminder-card">
            <input type="checkbox" />
            <p 
              onClick={() => {
                setModalState({
                  isOpen: true,
                  isUpdate: true
                });
                setRemindState({ message, key: id });
              }}
            >
            {message}
            </p>
        </div>
    )
}