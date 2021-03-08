import React from 'react'
import {connect} from 'react-redux'
import {handleItems} from '../../redux/actions/actions'

function Etudes(props){

    const etudesDropdown = []
    const addToDropdown = etude => {
        if (!etudesDropdown.includes(`${etude.composer}, ${etude.book} #${etude.number}`)) {
            etudesDropdown.push(`${etude.composer}, ${etude.book} #${etude.number}`)
        }
    }
    props.prevSessions?.forEach(sesh => sesh.etudes.forEach(etude => addToDropdown(etude)))
    props.etudes?.forEach(etude => addToDropdown(etude))

    return (
        <div className={'new-session-item'}>
            <div className={'new-session-item-row'}>
                <h4>Etudes</h4>
                <div className={'new-session-item-input'}>
                    <div className={'input-container'} >
                        <input className={'input-box'} name='composer' placeholder='Composer'/>
                        <input className={'input-box'} name='book' placeholder='Book'/>    
                        <input name='number' type='Number' placeholder='#' style={{width:'70px', marginLeft:'10px'}}/>     
                        <button className='btn btn-sm btn-outline-light' style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'etudes')}>Add/Rmv</button>
                    </div>
                    <div style={{alignSelf:'flex-end'}}>
                        <select style={{width:'350px'}}>
                            {etudesDropdown.map(etudeString => <option>{etudeString}</option>)}
                        </select>
                        <button className='btn btn-sm btn-outline-light' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'etudes')}>Add/Rmv</button>
                    </div>
                </div>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.etudes.map(etude => <p style={{marginBottom:'3px'}}>{`${etude.composer}, ${etude.book} #${etude.number}`}</p>)}
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

export default connect(mapStateToProps, {handleItems})(Etudes)