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
    current_user: {
        username: '',
        user_id: null,
        instrument: '',
        userSessions: [
            {
                id: null,
                date: '',
                duration: '',
                focus_rating: null,
                prod_rating: null,
                notes: '',
                etudes: [],
                pieces: [],
                excerpts: [],
                longtones: [],
                scales: []
            }
        ],
        userPerformances : [
            {
                id: null,
                date: '',
                composer: '',
                piece: '',
                event: ''
            }
        ]
    },
    session: {
        longtones: [],
        scales: [],
        etudes: [],
        pieces: [],
        excerpts: [],
        notes: '',
        prod_rating: 0,
        focus_rating: 0
    },
    performance : {
        date: '',
        composer: '',
        piece: '',
        event: ''
    },
    selectedPerf: 0,
    sortListBy : 'date'
}

const someReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'FORM_CHANGE' :
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
            }
        case 'SET_CURRENT_USER' :
            return {
                ...state, current_user: {...state.current_user, ...action.user}
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
        case 'CLEAR_SESSION_FORM' :
            return {
                ...state, session: {
                    longtones: [],
                    scales: [],
                    etudes: [],
                    pieces: [],
                    excerpts: [],
                    notes: '',
                    prod_rating: 0,
                    focus_rating: 0
                }
            }
        case 'UPDATE_USER' :
            return {
                ...state, current_user: {...state.current_user, username: action.updates.username, instrument: action.updates.instrument}
            }
        case 'UPDATE_SESSIONS' :
            return {
                ...state, current_user: {...state.current_user, userSessions: action.sessions}
            }
        case 'HANDLE_PERF_DATA' :
            return {
                ...state, performance: {...state.performance, [action.name]: action.value}
            }
        case 'SORT_PERF_LIST' :
            return {
                ...state, current_user: {...state.current_user, userPerformances: action.list}
            }
        case 'UPDATE_PERFORMANCES' :
            debugger
            return {
                ...state, current_user: {...state.current_user, userPerformances: action.perfArray}
            }
        case 'SELECT_PERF':
            return {
                ...state, selectedPerf: action.perf_id
            }
        case 'CHANGE_SORT_LIST_BY':
            return {
                ...state, sortListBy: action.param
            }
        default :
            return state
    }
}

export default someReducer