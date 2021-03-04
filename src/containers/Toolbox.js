import React from 'react'
import Metronome from '../components/Metronome'
import TunerContainer from '../components/TunerContainer'
import Drones from '../components/Drones'

function Toolbox(){
    return(
        <div id='toolbox-div' className='col-3' style={{marginTop:'40px', textAlign:'center'}}>
            <h2 style={{margin:'20px'}}>Toolbox</h2>
            <Metronome />
            <TunerContainer />
            <Drones />
        </div>
    )
}

export default Toolbox