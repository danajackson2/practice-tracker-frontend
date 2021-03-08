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

export const handleLongtones = (e) => {
    return {
        type: 'HANDLE_LONGTONES',
        longtone: e.target.name,
        checked: e.target.checked
    }
}

export const handleItems = (item, key) => {
    return {
        type: 'HANDLE_ITEMS',
        item: item,
        key: key
    }
}

export const handleNotes = (text) => {
    return {
        type: 'HANDLE_NOTES',
        text: text
    }
}

export const handleRating = (rating, kind) => {
    return {
        type: 'HANDLE_RATING',
        rating: rating,
        kind: kind
    }
}

export const clearSessionForm = () => {
    return {
        type: 'CLEAR_SESSION_FORM'
    }
}

export const updateUser = (updates) => {
    return {
        type: 'UPDATE_USER',
        updates: updates
    }
}

export const updateSessions = (sessions) => {
    return {
        type: 'UPDATE_SESSIONS',
        sessions: sessions
    }
}

export const handlePerfData = (e) => {
    return {
        type: 'HANDLE_PERF_DATA',
        value: e.target.value,
        name: e.target.name 
    }
}

export const sortPerfList = (newlySortedList) => {
    return {
        type: 'SORT_PERF_LIST',
        list: newlySortedList
    }
}

export const updatePerformances = (perfArray) => {
    return {
        type: 'UPDATE_PERFORMANCES',
        perfArray: perfArray
    }
}

export const selectPerf = (perf_id) => {
    return {
        type: 'SELECT_PERF',
        perf_id: perf_id
    }
}