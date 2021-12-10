import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../custom.css';
import './index.css';

const addIcon = <FontAwesomeIcon icon={faPlus} />

export default function Reminders() {
    return (
        <div className="employMe-div-box reminder">
            <div id="reminder-actions">
              <p className="employMe-div-box-title">Reminders</p>
              <button className="employMe-add-btn">{addIcon}</button>
            </div>
        </div>
    )
}