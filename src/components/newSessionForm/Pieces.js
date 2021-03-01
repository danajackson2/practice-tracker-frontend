import React from 'react'
import {connect} from 'react-redux'

function Pieces(props){
    return (
        <div style={{marginBottom: '30px', borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
            <h4 style={{float:'left'}}>Pieces</h4>
            <div style={{float:'right', marginBottom:'10px'}}>
                <input name='composer' placeholder='Composer' style={{width:'220px', marginLeft:'10px'}}/>
                <input name='title' placeholder='Title' style={{width:'220px', marginLeft:'10px'}}/>    
                <button className='btn btn-outline-light btn-sm'  style={{float:'right', marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'pieces')}>Add/Rmv</button>                           
            </div>
            <div style={{marginBottom:'10px', float:'right'}}>
                <select style={{width:'350px'}}>
                    {props.prevPieces.map(piece => <option>{`${piece.composer} - ${piece.title}`}</option>)}
                </select>
                <button className='btn btn-outline-light btn-sm' style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'pieces')}>Add/Rmv</button>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.pieces[0] ? props.pieces.map(piece => <p >{`${piece.composer} - ${piece.title}`}</p>) : ' '}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        prevPieces: state.prevPracData.pieces,
        pieces: state.session.pieces,
    }
}

export default connect(mapStateToProps)(Pieces)