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
    current_user: {},
    session: {
        longtones: [],
        scales: [],
        etudes: [],
        pieces: [],
        excerpts: [],
        notes: '',
        prod_rating: 0,
        focus_rating: 0,
        recordings: []
    }
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
        case 'HANDLE_LONGTONES' :
            if (action.checked) {
                return {
                    ...state, session: {...state.session, longtones: [...state.session.longtones, action.longtone]}
                }
            } else {
                return {
                    ...state, session: {...state.session, longtones: state.session.longtones.filter(lt => lt !== action.longtone)}
                }
            }
        case 'HANDLE_ITEMS' :
            let addItem
            let newArray 
            if (action.key === 'scales'){
                addItem = !state.session.scales.includes(action.item)
                newArray = state.session.scales.filter(scale => scale !== action.item)
            } else if (action.key === 'etudes'){
                newArray = state.session.etudes.filter(e => e.composer !== action.item.composer || e.book !== action.item.book || e.number !== action.item.number)
                addItem = newArray.length === state.session.etudes.length
            } else if (action.key === 'pieces'){
                newArray = state.session.pieces.filter(e => e.composer !== action.item.composer || e.title !== action.item.title)
                addItem = newArray.length === state.session.pieces.length
            } else if (action.key === 'excerpts'){
                newArray = state.session.excerpts.filter(e => e.composer !== action.item.composer || e.work !== action.item.work || e.place !== action.item.place)
                addItem = newArray.length === state.session.excerpts.length
            }
            if (addItem){
                return {
                    ...state, session: {...state.session, [action.key]: [...state.session[action.key], action.item]}
                }
            } else {
                return {
                    ...state, session: {...state.session, [action.key]: newArray}
                }
            }
        case 'HANDLE_NOTES' :
            return {
                ...state, session: {...state.session, notes: action.text}
            }
        case 'HANDLE_RATING' :
            return {
                ...state, session: {...state.session, [action.kind]: action.rating}
            }
        default :
            return state
    }
}

export default someReducer