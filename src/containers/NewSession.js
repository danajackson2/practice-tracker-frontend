import React from 'react'
import Recording from '../components/Recording' 
import Timer from '../components/Timer'
import {handleLongtones, handleItems, handleNotes, handleRating} from '../redux/actions/actions'
import {connect} from 'react-redux'

const notes =["A", "B♭", "B", "C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭"] 
const BASE_URL = 'http://localhost:3000'

function NewSession(props){

    const addRmvScale = e => {
        let note = e.target.previousElementSibling.previousElementSibling.value
        let quality = e.target.previousElementSibling.value
        props.handleItems(`${note} ${quality}`, 'scales')
    }

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
        // .then(data => {
        //     fetch('http://localhost:3000/add-recording',{
        //         method: 'POST',
        //         headers: {Authorization: `Bearer ${localStorage.token}`},
        //         body: {recordings: props.recordings, session_id: data.session_id}
        //     })
        // })
        .then(data => alert(data.message))
    }

    return(
        <div id='new-session-div' className='col-9'>
            <h2>New Session</h2>
            <div className='container'>
                <form onSubmit={e => saveSession(e, props.user_id, document.getElementById('current-date').textContent, document.getElementById('timer-count').textContent)}>
                    <div className='row justify-content-around'>
                        <div className='col-5' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                            <h3 id='current-date'>{String(new Date()).split(' ').slice(0,4).join(' ')}</h3>
                        </div>
                        <div className='col-5' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                            <Timer />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                            <div style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                                <h4 style={{float:'left'}}>Longtones</h4>
                                {notes.map(note => {
                                    return <>
                                        <label htmlFor={`${note}`}>{`${note}`}</label>
                                        <input onChange={props.handleLongtones} type='checkbox' name={`${note}`} style={{marginRight:'15px'}}/>
                                    </>
                                })}
                            </div>
                            <div style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                                <h4 style={{float:'left'}}>Scales</h4>
                                <span >{props.scales[0] ? props.scales.map(scale => <p style={{color:'white'}}>{`${scale}`}</p>) : ' '}</span>
                                <div >
                                    <select>
                                        {notes.map(note => <option value={`${note}`}>{`${note}`}</option>)}
                                    </select>
                                    <select>
                                        <option value='maj'>maj</option>
                                        <option value='min'>min</option>
                                    </select>
                                    <button type='button' className='btn btn-outline-light' onClick={addRmvScale}>Add/Rmv</button>
                                </div>
                            </div><br/>
                            <div style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                                <h4 style={{float:'left'}}>Etudes</h4>
                                <span >{props.etudes[0] ? props.etudes.map(etude => <p >{`${etude.composer}, ${etude.book} #${etude.number}`}</p>) : ' '}</span>
                                <select>
                                    {props.etudes.map(etude => <option>{`${etude.composer}, ${etude.book} #${etude.number}`}</option>)}
                                </select>
                                <button className='btn btn-outline-light' type='button' onClick={(e) => addRmvPieceExcEt(e, 'dropdown', 'etudes')}>Add/Rmv</button>
                                <div>
                                    <input name='composer' placeholder='Composer' />
                                    <input name='book' placeholder='Book'/>    
                                    <input name='number' type='Number' placeholder='number'/>     
                                </div>
                                <button className='btn btn-outline-light' type='button' onClick={(e) => addRmvPieceExcEt(e, 'input', 'etudes')}>Add/Rmv</button>                           
                            </div>
                            <div style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                                <h4 style={{float:'left'}}>Pieces</h4>
                                <span >{props.pieces[0] ? props.pieces.map(piece => <p >{`${piece.composer} - ${piece.title}`}</p>) : ' '}</span>
                                <select>
                                    {props.pieces.map(piece => <option>{`${piece.composer} - ${piece.title}`}</option>)}
                                </select>
                                <button className='btn btn-outline-light' type='button' onClick={(e) => addRmvPieceExcEt(e, 'dropdown', 'pieces')}>Add/Rmv</button>
                                <input name='composer' placeholder='Composer' />
                                <input name='title' placeholder='Title'/>    
                                <button className='btn btn-outline-light' type='button' onClick={(e) => addRmvPieceExcEt(e, 'input', 'pieces')}>Add/Rmv</button>                           
                            </div>
                            <div style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                                <h4 style={{float:'left'}}>Excerpts</h4>
                                <span >{props.excerpts[0] ? props.excerpts.map(excerpt => <p >{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</p>) : ' '}</span>
                                <select>
                                    {props.excerpts.map(excerpt => <option>{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</option>)}
                                </select>
                                <button className='btn btn-outline-light' type='button' onClick={(e) => addRmvPieceExcEt(e, 'dropdown', 'excerpts')}>Add/Rmv</button>
                                <input name='composer' placeholder='Composer' />
                                <input name='work' placeholder='Work'/>
                                <input name='place' placeholder='Place'/>    
                                <button className='btn btn-outline-light' type='button' onClick={(e) => addRmvPieceExcEt(e, 'input', 'excerpts')}>Add/Rmv</button>                           
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                            <h4 style={{float:'left'}}>Notes</h4>
                            <textarea style={{width:'100%'}} onChange={e => props.handleNotes(e.target.value)}/>
                        </div>
                        <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                            <Recording />
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                        <h4>Productivity : {props.prod_rating}/10</h4>
                        <input type="range" min="1" max="10" defaultValue='5' className="slider" onChange={e => props.handleRating(e.target.value, 'prod_rating')}/>
                    </div>
                    <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                        <h4>Focus : {props.focus_rating}/10</h4>
                        <input type="range" min="1" max="10" defaultValue='5' className="slider" onChange={e => props.handleRating(e.target.value, 'focus_rating')}/>
                    </div>
                    </div>
                    <button type='submit' className='btn btn-outline-light'>Save Session</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        scales: state.session.scales,
        etudes: state.session.etudes,
        pieces: state.session.pieces,
        excerpts: state.session.excerpts,
        prod_rating: state.session.prod_rating,
        focus_rating: state.session.focus_rating,
        session: state.session,
        user_id: state.current_user.user_id,
        recordings: state.session.recordings
    }
}

export default connect(mapStateToProps, {handleLongtones, handleItems, handleNotes, handleRating})(NewSession)