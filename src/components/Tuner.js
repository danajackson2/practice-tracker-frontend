import React, {useEffect, useState} from 'react'
import {initTuner} from '@ddlab/tuner'

function Tuner(){

    const [tunerOn, setTunerOn] = useState(false)

    const startTuner = () => {
        initTuner(document.getElementById('tuner-div'))
        document.querySelector('canvas').style.width = '200px'
        document.querySelector('canvas').style.height = '100px'
        document.querySelector('.tuner__turnOnBtn__V4Cv-').classList.add('btn')
        document.querySelector('.tuner__turnOnBtn__V4Cv-').classList.add('btn-outline-light')
        document.querySelector('.tuner__turnOnBtn__V4Cv-').addEventListener('click', () => setTunerOn(true))
        document.querySelector('.analogGauge__harmonics__1LAiu').remove()
        document.querySelector('.analogGauge__note__3SIaf').style.fontSize ='40px'
        document.querySelector('.analogGauge__cents__2YRR1')
    }

    useEffect(()=> {
        if (document.getElementById('tuner-div').innerHTML === ''){
            startTuner()
        }
    })

    const emptyTunerDiv = () => {
        document.querySelector('#tuner-div').innerHTML = ''
        setTunerOn(false)
        startTuner()
    }

    return(
        <div className={'toolbox-unit'} style={{minHeight:'320px'}}>
            <h4>Tuner</h4>
            <hr></hr>
            {tunerOn && <button className={'btn btn-outline-light'} style={{marginBottom:'10px'}} onClick={emptyTunerDiv}>Turn off</button>}
            <div id='tuner-div' style={{minHeight:'150px'}}></div>
            
        </div>
    )
}

export default Tuner