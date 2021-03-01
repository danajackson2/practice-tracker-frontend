import React from 'react'
import {connect} from 'react-redux'
import {handleLongtones} from '../../redux/actions/actions'
const notes =["A", "B♭", "B", "C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭"] 

function Longtones(props){
    return (
        <div style={{padding:'0px 0px 50px 0px'}}>
            <h4 style={{float:'left'}}>Longtones</h4>
            {notes.map(note => {
                return <>
                    <label htmlFor={`${note}`} style={{fontSize:'22px'}}>{`${note}`}</label>
                    <input onChange={props.handleLongtones} type='checkbox' name={`${note}`} style={{marginRight:'15px'}}/>
                </>
            })}
        </div>
    )
}

export default connect(null, {handleLongtones})(Longtones)