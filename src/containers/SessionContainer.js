import React from 'react'
import Toolbox from './Toolbox'
import NewSession from './NewSession'

function SessionContainer(props){
    return(
        <div className="container">
            <div className='row'>
                <Toolbox />
                <NewSession clearNewSession={props.clearNewSession}/>
            </div>
        </div>
    )
}

export default SessionContainer