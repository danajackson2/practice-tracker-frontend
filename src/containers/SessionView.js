import React, {useEffect, useState} from 'react'
import Player from '../components/newSessionForm/Player'
import {connect} from 'react-redux'
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
        let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(date).getDay()]
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
            .then(console.log)
            props.routerProps.history.push('/sessions')
        }

    }

    return(
        <div style={{borderStyle:'solid', borderWidth:'1px', color:'white', width:'800px', display:'flex', margin:'auto', flexDirection:'column', padding:'15px', marginTop:'40px'}}>
            <h4 style={{alignSelf:'center', marginBottom:'20px'}}>{`Session ${session.id}`}</h4>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <h1>{date}</h1>
                <h1>{session.duration}</h1>
            </div>
            <hr/>
            <div style={{display:'flex', flexDirection:'row', minHeight:'80px'}}>
                <h2 style={{width:'300px'}}>Longtones</h2>
                <p style={{width:'100%', fontSize:'22px'}}>{session.longtones.map(lt => `${lt.note} - `).join('').slice(0, -3)}</p>   
            </div>
            <div style={{display:'flex', flexDirection:'row', minHeight:'80px', justifyContent:'space-between'}}>
                <h2 style={{width:'300px'}}>Scales</h2>
                <p style={{width:'100%', fontSize:'22px'}}>{session.scales.map(s => `${s.note} ${s.quality} - `).join('').slice(0, -3)}</p>    
            </div>
            <div style={{display:'flex', flexDirection:'row', minHeight:'80px'}}>
                <h2 style={{width:'300px'}}>Etudes</h2>
                <ul style={{width:'100%', fontSize:'22px', listStyle:'none', paddingLeft:'0px'}}>{session.etudes.map(e => <li>{`${e.composer}, ${e.book} #${e.number}`}</li>)}</ul>    
            </div>          
            <div style={{display:'flex', flexDirection:'row', minHeight:'80px'}}>
                <h2 style={{width:'300px'}}>Pieces</h2>
                <ul style={{width:'100%', fontSize:'22px', listStyle:'none', paddingLeft:'0px'}}>{session.pieces.map(p => <li>{`${p.composer}, ${p.title}`}</li>)}</ul>       
            </div>
            <div style={{display:'flex', flexDirection:'row', minHeight:'80px'}}>
                <h2 style={{width:'300px'}}>Excerpts</h2>
                <ul style={{width:'100%', fontSize:'22px', listStyle:'none', paddingLeft:'0px'}}>{session.excerpts.map(e => <li>{`${e.composer}, ${e.work} - ${e.place}`}</li>)}</ul> 
            </div>
            <div style={{display:'flex', flexDirection:'row', marginBottom:'40px', minHeight:'200px'}}>
                <div style={{display:'flex', flexDirection:'column', width:'100%', marginRight:'10px'}}>
                    <h2>Notes</h2>
                    <p>{session.notes}</p> 
                </div>
                <div style={{display:'flex', flexDirection:'column', width:'100%', marginLeft:'10px'}}>
                    <h2>Recordings</h2>
                    <div>
                        {recordings?.map(rec => <Player key={rec.id} data={rec} deleteOption={false}/>)}
                    </div>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <h2>Productivity: {session.prod_rating}/10</h2>
                <h2>Focus: {session.focus_rating}/10</h2>
            </div>
            <button className={'btn btn-outline-light'} style={{marginTop:'40px', width:'30%', alignSelf:'center'}} onClick={deleteSession}>Delete Session</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sessions: state.current_user.userSessions,
        user_id: state.current_user.user_id
    }
}

export default connect(mapStateToProps)(SessionView)