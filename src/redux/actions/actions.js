export const formOnChange = (e, formType) => {
    return {
        type: 'FORM_CHANGE',
        key: e.target.name,
        value: e.target.value,
        formType: formType
    }
}

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        user: user
    }
}