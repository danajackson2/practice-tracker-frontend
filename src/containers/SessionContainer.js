import React from 'react'
import Toolbox from './Toolbox'
import NewSession from './NewSession'

function SessionContainer(){
    return(
        <div className="container">
            <div className='row'>
                <h1>Session Container</h1>
                <Toolbox />
                <NewSession />
            </div>
        </div>
    )
}

export default SessionContainer