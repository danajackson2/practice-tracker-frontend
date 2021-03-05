import React, {useEffect} from 'react'
import {initTuner} from '@ddlab/tuner'

function Tuner(){

    useEffect(()=> {
        if (document.getElementById('tuner-div').innerHTML === ''){
            initTuner(document.getElementById('tuner-div'))
            document.querySelector('canvas').style.width = '200px'
            document.getElementsByClassName('tuner__turnOnBtn__V4Cv-')[0].classList.add(['btn', 'btn-outline-light'])
        }
    })

    return(
        <div style={{borderStyle: 'solid', borderWidth:'1px', borderRadius:'10px', minHeight:'250px', marginBottom:'20px'}}>
            <h4 style={{marginTop:'10px'}}>Tuner</h4>
            <hr style={{margin:'5px 15px 20px 15px'}}></hr>
            <div id='tuner-div'></div>
        </div>
    )
}

export default Tuner