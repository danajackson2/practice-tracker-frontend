import React from 'react'
import {connect} from 'react-redux'

function Etudes(props){
    const prevEtudes = []
    props.prevSessions.forEach(sesh => sesh.etudes.forEach(etude => prevEtudes.push(etude)))

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom:'30px', minHeight:'150px'}}>
            <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <h4>Etudes</h4>
                <div style={{display:'flex', flexDirection: 'column', justifyContent:'flex-end'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom:'10px'}}>
                        <input name='composer' placeholder='Composer' style={{width:'220px', marginLeft:'10px'}}/>
                        <input name='book' placeholder='Book' style={{width:'220px', marginLeft:'10px'}}/>    
                        <input name='number' type='Number' placeholder='#' style={{width:'70px', marginLeft:'10px'}}/>     
                        <button className='btn btn-sm btn-outline-light' style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'etudes')}>Add/Rmv</button>
                    </div>
                    <div style={{alignSelf:'flex-end'}}>
                        <select style={{width:'350px'}}>
                            {prevEtudes.map(etude => <option>{`${etude.composer}, ${etude.book} #${etude.number}`}</option>)}
                        </select>
                        <button className='btn btn-sm btn-outline-light' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'etudes')}>Add/Rmv</button>
                    </div>
                </div>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.etudes[0] ? props.etudes.map(etude => <p style={{marginBottom:'3px'}}>{`${etude.composer}, ${etude.book} #${etude.number}`}</p>) : ''}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        prevSessions: state.current_user.userSessions,
        etudes: state.session.etudes
    }
}

export default connect(mapStateToProps)(Etudes)