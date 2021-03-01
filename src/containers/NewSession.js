import React from 'react'
import Recording from '../components/newSessionForm/Recording' 
import Timer from '../components/Timer'
import Longtones from '../components/newSessionForm/Longtones'
import Scales from '../components/newSessionForm/Scales'
import Etudes from '../components/newSessionForm/Etudes'
import Pieces from '../components/newSessionForm/Pieces'
import Excerpts from '../components/newSessionForm/Excerpts'
import Notes from '../components/newSessionForm/Notes'
import Ratings from '../components/newSessionForm/Ratings'
import {handleItems} from '../redux/actions/actions'
import {connect} from 'react-redux'

const BASE_URL = 'http://localhost:3000'

function NewSession(props){

    const addRmvPieceExcEt = (e, type, key) => {
        if (type === 'input'){
            let item = {}
            Array.from(e.target.parentElement.querySelectorAll('input')).map(i => item[i.name] = i.value)
            if (Object.values(item).filter(v => v === '').length === 0){    
                props.handleItems(item, key)
            } else {
                alert('All fields must be filled in')
            }
        } else {
            let data = e.target.previousSibling.value
            if (data !== ''){
                let item
                if (key === 'etudes'){
                    item = {composer: data.split(', ')[0], book: data.split(' ')[1], number: data.split(' ')[2].slice(1)}
                } else if (key === 'pieces'){
                    item = {composer: data.split(' - ')[0], title: data.split(' - ')[1]}
                } else if (key === 'excerpts'){
                    item = {composer: data.split(' - ')[0], work: data.split(' - ')[1], place: data.split(' - ')[2]}
                }
                props.handleItems(item, key)
            }
        }
        Array.from(e.target.parentElement.querySelectorAll('input')).forEach(input => input.value = '')
    }

    const saveSession = (e, user_id, date, duration) => {
        e.preventDefault()
        fetch(`${BASE_URL}/sessions`, {
            method: 'POST',
            headers: {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`},
            body: JSON.stringify({session: {...props.session, date: date, duration: duration, user_id: user_id}})
        })
        .then(res => res.json())
        .then(data => alert(data.message))
    }

    return(
        <div id='new-session-div' className='col-9' style={{width:'850px'}}>
            <h1 style={{padding:'0px 0px 20px 0px'}}>Practice Session</h1>
            <div className='container'>
                <form onSubmit={e => saveSession(e, props.user_id, document.getElementById('current-date').textContent, document.getElementById('timer-count').textContent)}>
                    <div className='row justify-content-around'>
                        <div className='col-5' >
                            <h3 id='current-date'>{String(new Date()).split(' ').slice(0,4).join(' ')}</h3>
                        </div>
                        <div className='col-5' >
                            <Timer />
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <div className='col' >
                            <Longtones/>
                            <Scales />
                            <Etudes addRmvPieceExcEt={addRmvPieceExcEt}/>
                            <Pieces addRmvPieceExcEt={addRmvPieceExcEt}/>
                            <Excerpts addRmvPieceExcEt={addRmvPieceExcEt}/>
                        </div>
                    </div>
                    <div className='row' style={{height:'300px', marginTop:'20px'}}>
                        <Notes />
                        <Recording />
                    </div>
                    <div className='row' style={{marginTop:'30px'}}>
                        <Ratings />
                    </div>
                    <button type='submit' className='btn btn-outline-light' style={{width:'200px', margin:'50px 0px 30px 0px'}}>Save Session</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        session: state.session,
        user_id: state.current_user.user_id,
    }
}

export default connect(mapStateToProps, {handleItems})(NewSession)