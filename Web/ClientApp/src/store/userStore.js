const root = "EmployME/User/"

const SIGNED_IN = `${root}SIGNED_IN`

const init = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    companyName: "",
    joinedDate: "" 
}

export const actions = {
    signInUser: (action) => {
        return{
            type: SIGNED_IN,
            userObj: action
        }
    },
}

const handleSignIn = (state, action) => {
    return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        username: action.username,
        email: action.email,
        companyName: action.companyName,
        joinedDate: action.uploadDate
    }
}

const userReducer = (state = init, action) => {
    switch (action.type) {
        case SIGNED_IN:
            return handleSignIn(state, action.userObj)
        
        default:
            return state;
    }
}

export default userReducer