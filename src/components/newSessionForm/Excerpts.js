import React from 'react'
import {connect} from 'react-redux'

function Excerpts(props){

    const excerptsDropdown = []
    const addToDropdown = excerpt => {
        if (!excerptsDropdown.includes(`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`)) {
            excerptsDropdown.push(`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`)
        }
    }
    props.prevSessions?.forEach(sesh => sesh.excerpts.forEach(excerpt => addToDropdown(excerpt)))
    props.excerpts?.forEach(excerpt => addToDropdown(excerpt))

    return (
        <div className={'new-session-item'}>
            <div className={'new-session-item-row'}>
                <h4>Excerpts</h4>
                <div className={'new-session-item-input'}>
                    <div className={'input-container'}>
                        <input className={'input-box'} name='composer' placeholder='Composer'/>
                        <input className={'input-box'} name='work' placeholder='Work'/>
                        <input name='place' placeholder='Place' style={{width:'100px', marginLeft:'10px'}}/>    
                        <button className='btn btn-outline-light btn-sm' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'excerpts')}>Add/Rmv</button>                    
                    </div>
                    <div style={{alignSelf:'flex-end'}}>
                        <select style={{width:'350px'}}>
                            {excerptsDropdown.map(excerptString => <option>{excerptString}</option>)}
                        </select>
                        <button className='btn btn-outline-light btn-sm' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'excerpts')}>Add/Rmv</button> 
                    </div>         
                </div>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.excerpts.map(excerpt => <p style={{marginBottom:'3px'}}>{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</p>)}
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