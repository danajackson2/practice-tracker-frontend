import React from 'react'
import {connect} from 'react-redux'
import {handleLongtones} from '../../redux/actions/actions'
const notes =["A", "B♭", "B", "C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭"] 

function Longtones(props){
    return (
        <div style={{padding:'0px 0px 30px 0px', display:'flex', justifyContent:'space-between'}}>
            <div>
                <h4 >Longtones</h4>
            </div>
            <div style={{display:'flex', alignItems: 'baseline'}}>
                <div >
                    {notes.map(note => {
                        return <>
                            <label htmlFor={`${note}`} style={{fontSize:'22px'}}>{`${note}`}</label>
                            <input onChange={props.handleLongtones} type='checkbox' name={`${note}`} style={{marginRight:'15px'}}/>
                        </>
                    })}
                </div>
            </div>
        </div>
    )
}

export default connect(null, {handleLongtones})(Longtones)