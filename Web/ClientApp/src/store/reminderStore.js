const root = "EmployME/Reminders/"

const LOAD_STARTED = `${root}LOAD_STARTED`;
const LOAD_COMPLETED = `${root}LOAD_COMPLETED`;
const LOAD_FAILED = `${root}LOAD_FAILED`;
const RESET_REMINDERS = `${root}RESET_REMINDERS`;
const ADD_CHECK = `${root}ADD_CHECK`;
const REMOVE_CHECK = `${root}REMOVE_CHECK`;
const RESET_CHECKS = `${root}RESET_CHECKS`;

const LOADING_STATUS = Object.freeze({
    NOT_STARTED: 'not_started',
    STARTED: 'started',
    COMPLETED: 'completed',
    FAILED: 'failed',
})

const init = {
  loadingStatus: LOADING_STATUS.NOT_STARTED,
  reminders: [],
  checked: []
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
    },
    addCheck: (id) => {
        return {
            type: ADD_CHECK,
            id
        }
    },
    removeCheck: (id) => {
        return {
            type: REMOVE_CHECK,
            id
        }
    },
    resetChecks: () =>  {
        return {
            type: RESET_CHECKS
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

const addCheck = (state, action) => {
    return {
        ...state,
        checked: [...state.checked, action.id]
    }
}

const removeCheck = (state, action) => {
    const newArray = state.checked.filter((c) => c !== action.id)
    return {
        ...state,
        checked: newArray
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

        case ADD_CHECK:
            return addCheck(state, action)

        case REMOVE_CHECK:
            return removeCheck(state, action)

        case RESET_CHECKS:
            return {
                ...state,
                checked: []
            }
        
        default:
            return state;
    }
}

export default reminderReducer