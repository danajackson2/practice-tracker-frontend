import React from 'react'
import Recording from '../components/Recording' 
import Timer from '../components/Timer'

function NewSession(){
    return(
        <div>
            <h2>New Session</h2>
            <Timer />
            <Recording />
        </div>
    )
}

export default NewSession