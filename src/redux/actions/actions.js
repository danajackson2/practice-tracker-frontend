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