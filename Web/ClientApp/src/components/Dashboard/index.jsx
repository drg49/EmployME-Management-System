import React from 'react';
import { useSelector } from 'react-redux';
import Reminders from './Reminders';
import Notifications from './Notifications';

export default function Dashboard({ initLoad, setInitLoad }) {
  const userData = useSelector(state => state.user);

  return (
      <div id="main-page-wrapper">
        <h1 id="greeting">Hello {userData.firstName}!</h1>
        <div id="landing-pg-main">
          <Reminders initLoad={initLoad} setInitLoad={setInitLoad} />
          <Notifications />
        </div>
      </div>
  )
};
