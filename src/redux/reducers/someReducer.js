const initialState = {
    signup: {
        username: '',
        instrument: '',
        password: ''
    },
    login: {
        username: '',
        password: ''
    },
    current_user: {}
}

const someReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'FORM_CHANGE' :
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
            }
        case 'SET_CURRENT_USER' :
            return {
                ...state, current_user: action.user
            }
        default :
            return state
    }
}

export default someReducer