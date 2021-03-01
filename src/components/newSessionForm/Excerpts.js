import React from 'react'
import {connect} from 'react-redux'

function Excerpts(props){
    return (
        <div style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid', marginBottom:'30px'}}>
            <h4 style={{float:'left'}}>Excerpts</h4>
            <div style={{float:'right', marginBottom:'10px'}}>
                <input name='composer' placeholder='Composer' style={{width:'200px', marginLeft:'10px'}}/>
                <input name='work' placeholder='Work' style={{width:'200px', marginLeft:'10px'}}/>
                <input name='place' placeholder='Place' style={{width:'100px', marginLeft:'10px'}}/>    
                <button className='btn btn-outline-light btn-sm' type='button' style={{float:'right', marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'excerpts')}>Add/Rmv</button>                    
            </div>
            <div style={{marginBottom:'10px', float:'right'}}>
                <select style={{width:'350px'}}>
                    {props.prevExcerpts.map(excerpt => <option>{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</option>)}
                </select>
                <button className='btn btn-outline-light btn-sm' type='button' style={{marginLeft:'10px'}} onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'excerpts')}>Add/Rmv</button> 
            </div>
            <div style={{fontSize:'22px'}}>
                {props.excerpts[0] ? props.excerpts.map(excerpt => <p >{`${excerpt.composer} - ${excerpt.work} - ${excerpt.place}`}</p>) : ' '}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        prevExcerpts: state.prevPracData.excerpts,
        excerpts: state.session.excerpts,
    }
}

export default connect(mapStateToProps)(Excerpts)