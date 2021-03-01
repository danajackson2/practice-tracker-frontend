import React from 'react'
import {connect} from 'react-redux'
import {handleNotes} from '../../redux/actions/actions'

function Notes(props){
    return (
        <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
            <h4 style={{float:'left'}}>Notes</h4>
            <textarea style={{width:'100%', height:'80%', fontSize:'14px'}} onChange={e => props.handleNotes(e.target.value)}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        notes: state.session.etudes,
    }
}

export default connect(mapStateToProps, {handleNotes})(Notes)