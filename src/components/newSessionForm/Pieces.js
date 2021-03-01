import React from 'react'
import {connect} from 'react-redux'

function Pieces(props){
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom:'30px'}}>
            <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <h4 >Pieces</h4>
                <div style={{display:'flex', flexDirection: 'column', justifyContent:'flex-end'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom:'10px'}}>
                        <input name='composer' placeholder='Composer' style={{width:'220px', marginLeft:'10px'}}/>
                        <input name='title' placeholder='Title' style={{width:'220px', marginLeft:'10px'}}/>    
                        <button className='btn btn-outline-light btn-sm'  style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'pieces')}>Add/Rmv</button>                           
                    </div>
           
                <div style={{alignSelf:'flex-end'}}>
                    <select style={{width:'350px'}}>
                        {props.prevPieces.map(piece => <option>{`${piece.composer} - ${piece.title}`}</option>)}
                    </select>
                    <button className='btn btn-outline-light btn-sm' style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'pieces')}>Add/Rmv</button>
                </div>
                </div>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.pieces[0] ? props.pieces.map(piece => <p style={{marginBottom:'3px'}}>{`${piece.composer} - ${piece.title}`}</p>) : ' '}
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