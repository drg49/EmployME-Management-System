const root = "EmployME/Reminders/"

const LOAD_STARTED = `${root}LOAD_STARTED`;
const LOAD_COMPLETED = `${root}LOAD_COMPLETED`;
const LOAD_FAILED = `${root}LOAD_FAILED`;
const RESET_REMINDERS = `${root}RESET_REMINDERS`;

const LOADING_STATUS = Object.freeze({
    NOT_STARTED: 'not_started',
    STARTED: 'started',
    COMPLETED: 'completed',
    FAILED: 'failed',
})

const init = {
  loadingStatus: LOADING_STATUS.NOT_STARTED,
  reminders: []
}

export const actions = {
    loadStarted: Object.freeze({
        type: LOAD_STARTED
    }),
    loadCompleted: (reminders) => {
        return{
            type: LOAD_COMPLETED,
            reminders
        }
    },
    loadFailed: Object.freeze({
        type: LOAD_FAILED
    }),
    resetReminders: (reminders) => {
        return {
            type: RESET_REMINDERS,
            reminders
        }
    }
}

const loadReminders = (state, reminders) => {
  if(Array.isArray(reminders)) {
    return {
      ...init,
      reminders
    }
  }

  return state
}

const resetReminders = (state, action) => {
    return {
        ...state,
        reminders: action.reminders
    }
}

const reminderReducer = (state = init, action) => {
    switch (action.type) {
        case LOAD_STARTED:
            return {
                ...state,
                loadingStatus: LOADING_STATUS.STARTED
            }

        case LOAD_COMPLETED:
            return {
                ...loadReminders(state, action.reminders),
                loadingStatus: LOADING_STATUS.COMPLETED,
            }

        case LOAD_FAILED:
            return {
                ...state,
                loadingStatus: LOADING_STATUS.FAILED
            }

        case RESET_REMINDERS:
            return resetReminders(state, action)
        
        default:
            return state;
    }
}

export default reminderReducer