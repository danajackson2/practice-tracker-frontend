import React from 'react'
import Toolbox from './Toolbox'
import NewSession from './NewSession'

function SessionContainer(){
    return(
        <div>
            <h1>Session Container</h1>
                <Toolbox />
                <NewSession />
        </div>
    )
}

export default SessionContainer