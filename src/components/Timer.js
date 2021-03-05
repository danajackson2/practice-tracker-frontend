import React from 'react'

function Timer(){
    
    window.timer = null
    
    const updateTimer = () => { 
        const currTime = document.getElementById('timer-count').textContent
        const newSeconds = currTime.split(':')[0]*3600 + currTime.split(':')[1]*60 + currTime.split(':')[2]*1 + 1
        const hr = ('0' + Math.floor(newSeconds/3600)).slice(-2)
        const min = ('0' + Math.floor(newSeconds/60)).slice(-2)
        const sec = ('0' + (newSeconds % 60)).slice(-2)
        document.getElementById('timer-count').textContent = `${hr}:${min}:${sec}`
    }

    const startTimer = () => {
        if (window.timer === null){ 
            return window.timer = setInterval(updateTimer, 1000)
        }
    }

    const stopTimer = () => {
        clearInterval(window.timer)
        window.timer = null
    }

    return(
        <div>
            <h3 id='timer-count'>{'00:00:00'}</h3> 
            <button type='button' className='btn btn-outline-light' id='timer-button' onClick={startTimer}>Start</button>
            <button type='button' className='btn btn-outline-light' id='timer-button' onClick={stopTimer}>Stop</button>
        </div>
    )
}

export default Timer