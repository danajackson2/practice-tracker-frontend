import React from 'react'
import {connect} from 'react-redux'
import {handleItems} from '../../redux/actions/actions'
const notes =["A", "B♭", "B", "C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭"] 

function Scales(props){

    const addRmvScale = e => {
        let note = e.target.previousElementSibling.previousElementSibling.value
        let quality = e.target.previousElementSibling.value
        props.handleItems(`${note} ${quality}`, 'scales')
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', marginBottom:'30px', justifyContent:'space-between'}}>
                <div>
                    <h4>Scales</h4>
                </div>
                <div>
                    <p style={{fontSize:'22px'}}>{props.scales.map(scale => `${scale} - `)}</p>
                </div>
                <div style={{padding:'5px 5px 20px 5px'}}>
                    <select style={{marginLeft:'10px'}}>
                        {notes.map(note => <option value={`${note}`}>{`${note}`}</option>)}
                    </select>
                    <select style={{marginLeft:'10px'}}>
                        <option value='maj'>maj</option>
                        <option value='min'>min</option>
                    </select>
                    <button style={{marginLeft:'10px'}} type='button' className='btn btn-sm btn-outline-light' onClick={addRmvScale}>Add/Rmv</button>
                </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        scales: state.session.scales,
    }
}

export default connect(mapStateToProps, {handleItems})(Scales)