import React, {useEffect, useState} from 'react'
import Player from '../components/newSessionForm/Player'
import {connect} from 'react-redux'
import {updateSessions} from '../redux/actions/actions'
const BASE_URL = 'http://localhost:3000'

function SessionView(props){

    const [recordings, setRecordings] = useState([])
    const [date, setDate] = useState('')

    // const session = props.sessions?.filter(s => s.id === parseInt(props.routerProps.match.params.id))[0]
    const session = props.sessions[0].id ? props.sessions.filter(s => s.id === parseInt(props.routerProps.match.params.id))[0] : props.sessions[0]

    useEffect(() => {
        if (!!session.id) {
            fetch(`${BASE_URL}/recordings/${session.id}`,{
                headers: {Authorization: `Bearer ${localStorage.token}`}
            })
            .then(res => res.json())
            .then(data => setRecordings(data.recordings))
        }
        setDate(formatDate(session.date))
    }, [session.date, session.id])

    const formatDate = (date) =>{
        let day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][new Date(date).getDay()]
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(date).getMonth()]
        let dayNum = date?.split('-')[2]?.replace('0', '')
        return `${day} ${month} ${dayNum}, ${date.split('-')[0]}`
    }

    const deleteSession = () => {
        if (window.confirm('Are you sure you want to delete this session?')){
            fetch(`${BASE_URL}/sessions/${session.id}`, {
                method:'DELETE',
                headers: {Authorization: `Bearer ${localStorage.token}`}
            })
            .then(res => res.json())
            .then(data => props.updateSessions(data))
            props.routerProps.history.push('/history')
        }

    }

    return(
        <div id={'session-view'}>
            <h4 style={{alignSelf:'center', marginBottom:'20px'}}>{`Session ${session.id}`}</h4>
            <div className={'prod-focus'}>
                <h1>{date}</h1>
                <h1>{session.duration}</h1>
            </div>
            <hr/>
            <div className={'session-view-row'}>
                <h2 className={'sv-header'}>Longtones</h2>
                <p style={{width:'100%', fontSize:'22px'}}>{session.longtones.map(lt => `${lt.note} - `).join('').slice(0, -3)}</p>   
            </div>
            <div className={'session-view-row'} >
                <h2 className={'sv-header'}>Scales</h2>
                <p style={{width:'100%', fontSize:'22px'}}>{session.scales.map(s => `${s.note} ${s.quality} - `).join('').slice(0, -3)}</p>    
            </div>
            <div className={'session-view-row'}>
                <h2 className={'sv-header'}>Etudes</h2>
                <ul className={'sv-item-list'}>{session.etudes.map(e => <li>{`${e.composer}, ${e.book} #${e.number}`}</li>)}</ul>    
            </div>          
            <div className={'session-view-row'}>
                <h2 className={'sv-header'}>Pieces</h2>
                <ul className={'sv-item-list'}>{session.pieces.map(p => <li>{`${p.composer}, ${p.title}`}</li>)}</ul>       
            </div>
            <div className={'session-view-row'}>
                <h2 className={'sv-header'}>Excerpts</h2>
                <ul className={'sv-item-list'}>{session.excerpts.map(e => <li>{`${e.composer}, ${e.work} - ${e.place}`}</li>)}</ul> 
            </div>
            <div className={'sv-notes-rec'}>
                <div className={'sv-notes-rec-col'}>
                    <h2>Notes</h2>
                    <p style={{overflow:'auto'}}>{session.notes}</p> 
                </div>
                <div className={'sv-notes-rec-col'}>
                    <h2>Recordings</h2>
                    <div style={{overflow:'auto'}}>
                        {recordings?.map(rec => <Player key={rec.id} data={rec} deleteOption={false}/>)}
                    </div>
                </div>
            </div>
            <div className={'prod-focus'}>
                <h2>Productivity: {session.prod_rating}/10</h2>
                <h2>Focus: {session.focus_rating}/10</h2>
            </div>
            <button className={'btn btn-outline-light del-sesh'} onClick={deleteSession}>Delete Session</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sessions: state.current_user.userSessions,
        user_id: state.current_user.user_id
    }
}

export default connect(mapStateToProps, {updateSessions})(SessionView)