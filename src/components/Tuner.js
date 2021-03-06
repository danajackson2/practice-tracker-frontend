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
        <div style={{borderStyle: 'solid', borderWidth:'1px', borderRadius:'10px', minHeight:'320px', marginBottom:'20px'}}>
            <h4 style={{marginTop:'10px'}}>Tuner</h4>
            <hr style={{margin:'5px 15px 20px 15px'}}></hr>
            {tunerOn && <button className={'btn btn-outline-light'} style={{marginBottom:'10px'}} onClick={emptyTunerDiv}>Turn off</button>}
            <div id='tuner-div' style={{minHeight:'150px'}}></div>
            {/* {tunerOn && 
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div style={{position: 'relative', height:'30px', width:'240px', backgroundColor:'#1C3334', marginBottom:'5px'}}>
                        <div id={'neg-cents'} style={{height:'30px', width:'20px', position: 'absolute', top:'0', left:'0', backgroundColor:'#DA7B93' }}></div>
                        <div style={{height:'30px', width:'2px', position: 'absolute', top:'0', left:'119px', backgroundColor:'white' }}></div>
                        <div id={'pos-cents'} style={{height:'30px', width:'20px', position: 'absolute', top:'0', left:'120px', backgroundColor:'#DA7B93' }}></div>
                    </div>
                </div>
            } */}
        </div>
    )
}

export default Tuner