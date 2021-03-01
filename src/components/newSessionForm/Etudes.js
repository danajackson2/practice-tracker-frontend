import React from 'react'
import {connect} from 'react-redux'

function Etudes(props){
    return (
        <div style={{marginBottom:'30px'}}>
            <div >
                <h4 style={{float:'left'}}>Etudes</h4>
                <div style={{float:'right', marginBottom:'10px'}}>
                    <input name='composer' placeholder='Composer' style={{width:'220px', marginLeft:'10px'}}/>
                    <input name='book' placeholder='Book' style={{width:'220px', marginLeft:'10px'}}/>    
                    <input name='number' type='Number' placeholder='#' style={{width:'70px', marginLeft:'10px'}}/>     
                    <button className='btn btn-sm btn-outline-light' style={{float:'right', marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'etudes')}>Add/Rmv</button>
                </div>
            </div>
            <div style={{marginBottom:'10px', float:'right'}}>
                <select style={{width:'350px'}}>
                    {props.prevEtudes.map(etude => <option>{`${etude.composer}, ${etude.book} #${etude.number}`}</option>)}
                </select>
                <button className='btn btn-sm btn-outline-light' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'etudes')}>Add/Rmv</button>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.etudes[0] ? props.etudes.map(etude => <p >{`${etude.composer}, ${etude.book} #${etude.number}`}</p>) : ''}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        prevEtudes: state.prevPracData.etudes,
        etudes: state.session.etudes,
    }
}

export default connect(mapStateToProps)(Etudes)