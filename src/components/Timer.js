import React from 'react'
let timer
class Timer extends React.Component{
    
    state = {
        seconds: 0
    }

    updateTimer = () => {
        this.setState(prevState => {
            return {seconds: prevState.seconds + 1}
        })
    }

    startTimer = (e) => {
        e.stopPropagation()
        if (!timer){ 
            timer = setInterval(this.updateTimer, 1000)
        }
    }

    stopTimer = (e) => {
        e.stopPropagation()
            clearTimeout(timer)
    }

    render(){
        let hours = ('0' + Math.floor(this.state.seconds/3600)).slice(-2)
        let minutes = ('0' + Math.floor(this.state.seconds/60)).slice(-2)
        let seconds = ('0' + (this.state.seconds % 60)).slice(-2)
        return(
            <div>
                <button type='button' className='btn btn-outline-light' id='timer-button' onClick={this.startTimer}>Start</button>
                <button type='button' className='btn btn-outline-light' id='timer-button' onClick={this.stopTimer}>Stop</button>
                <h3 id='timer-count'>{`${hours}:${minutes}:${seconds}`}</h3>
            </div>
        )
    }
}

export default Timer