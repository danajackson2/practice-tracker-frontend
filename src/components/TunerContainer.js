import React from 'react'
import Tuner from './tuner/tuner/index'


function TunerContainer(){
    

    return(
        <div style={{borderStyle: 'solid', borderWidth:'1px', borderRadius:'10px', minHeight:'200px', marginBottom:'20px'}} >
            Tuner Component
            <Tuner />
        </div>
    )
}

export default TunerContainer