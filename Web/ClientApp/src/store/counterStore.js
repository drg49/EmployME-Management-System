const init = {
    numValue: 0,
    otherValue: "default"
}

export const actions = {
    increment: () => {
        return{
            type: 'INCREMENT'
        }
    }
}

const handleIncrement = (state) => {
    
    return {
        ...state,
        numValue: state.numValue + 1
    }
}

const counterReducer = (state = init, action) => {
    
    switch (action.type) {
        case 'INCREMENT':
            return handleIncrement(state)
        case 'DECREMENT':
            return state - action.payload
        default:
            return state;
    }
}

export default counterReducer