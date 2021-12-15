import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store/reminderStore';
import * as api from '../api/reminders'

export default function useReminders() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.reminders)

    React.useEffect(() => {
      if (state.loadingStatus === 'not_started') {
        dispatch(actions.loadStarted)
          api.getReminders().then((reminders => {
            dispatch(actions.loadCompleted(reminders.reverse()));
          })).catch(() => {
            dispatch(actions.loadFailed)
          })  
      }
    }, [dispatch])

    return {
      ...state
    }
}

