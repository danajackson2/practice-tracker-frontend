import React from 'react'
import Toolbox from './Toolbox'
import NewSession from './NewSession'

function SessionContainer(){
    return(
        <div className="container">
            <div className='row'>
                <Toolbox />
                <NewSession />
            </div>
        </div>
    )
}

export default SessionContainer