import React from 'react';
import { useSelector } from 'react-redux';
import Reminders from './Reminders';
import Notifications from './Notifications';

export default function Dashboard() {
  const userData = useSelector(state => state.user);

  return (
      <div id="dashboard-wrapper">
        <h1 id="greeting">Hello {userData.firstName}!</h1>
        <div id="dasboard-main">
          <Reminders />
          <Notifications />
        </div>
      </div>
  )
};
