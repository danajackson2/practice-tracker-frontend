import React from 'react'
import {connect} from 'react-redux'

function Pieces(props){

    const piecesDropdown = []
    const addToDropdown = piece => {
        if (!piecesDropdown.includes(`${piece.composer} - ${piece.title}`)) {
            piecesDropdown.push(`${piece.composer} - ${piece.title}`)
        }
    }
    props.prevSessions?.forEach(sesh => sesh.pieces.forEach(piece => addToDropdown(piece)))
    props.pieces?.forEach(piece => addToDropdown(piece))

    return (
        <div className={'new-session-item'}>
            <div className={'new-session-item-row'}>
                <h4 >Pieces</h4>
                <div className={'new-session-item-input'}>
                    <div className={'input-container'}>
                        <input className={'input-box'} name='composer' placeholder='Composer'/>
                        <input className={'input-box'} name='title' placeholder='Title'/>    
                        <button className='btn btn-outline-light btn-sm'  style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'input', 'pieces')}>Add/Rmv</button>                           
                    </div>
                    <div style={{alignSelf:'flex-end'}}>
                        <select style={{width:'350px'}}>
                            {piecesDropdown.map(pieceString => <option>{pieceString}</option>)}
                        </select>
                        <button className='btn btn-outline-light btn-sm' style={{marginLeft:'10px'}} type='button' onClick={(e) => props.addRmvPieceExcEt(e, 'dropdown', 'pieces')}>Add/Rmv</button>
                    </div>
                </div>
            </div>
            <div style={{fontSize:'22px'}}>
                {props.pieces.map(piece => <p style={{marginBottom:'3px'}}>{`${piece.composer} - ${piece.title}`}</p>)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        prevSessions: state.current_user.userSessions,
        pieces: state.session.pieces,
    }
}

export default connect(mapStateToProps)(Pieces)