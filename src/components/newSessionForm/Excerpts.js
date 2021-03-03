import React from 'react'
import {connect} from 'react-redux'

function Excerpts(props){

    const prevExcerpts = []
    props.prevSessions.forEach(sesh => sesh.excerpts.forEach(excerpt => prevExcerpts.push(excerpt)))

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom:'30px', minHeight:'150px'}}>
            <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <h4>Excerpts</h4>
                <div style={{display:'flex', flexDirection: 'column', justifyContent:'flex-end'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom:'10px'}}>
                        <input name='composer' placeholder='Composer' style={{width:'200px', marginLeft:'10px'}}/>
                        <input name='work' placeholder='Work' style={{width:'200px', marginLeft:'10px'}}/>
                        <input name='place' placeholder='Place' style={{width:'100px', marginLeft:'10px'}}/>    
                        <button className='btn btn-outline-light btn-sm' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'excerpts')}>Add/Rmv</button>                    
                    </div>
                    <div style={{alignSelf:'flex-end'}}>
                        <select style={{width:'350px'}}>
                            {prevExcerpts.map(excerpt => <option >{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</option>)}
                        </select>
                        <button className='btn btn-outline-light btn-sm' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'excerpts')}>Add/Rmv</button> 
                    </div>         
                </div>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.excerpts[0] ? props.excerpts.map(excerpt => <p style={{marginBottom:'3px'}}>{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</p>) : ' '}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        prevSessions: state.current_user.userSessions,
        excerpts: state.session.excerpts,
    }
}

export default connect(mapStateToProps)(Excerpts)