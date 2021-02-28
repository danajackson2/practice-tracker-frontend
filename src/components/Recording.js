import React from 'react'
import Player from './Player'
// npm install mic-recorder-to-mp3
const MicRecorder = require('mic-recorder-to-mp3')
const recorder = new MicRecorder({bitRate: 128})
let formData = new FormData()
class Recording extends React.Component {

    state = {
        blinking: false,
        rec_data: [],
        rec_name: ''
    }

    startRecording = () => {
        recorder.start()
        this.setState({blinking: true})
    }

    stopRecording = () => {
        recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
            formData.append('data[recording]', blob)
            formData.append('data[name]', this.state.rec_name)
        })
        .then(() => {
            fetch('http://localhost:3000/recordings',{
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.token}`},
                body: formData
            })
            .then(res => res.json())
            .then(data => this.setState({rec_data: [...this.state.rec_data, data]}))
        })
        formData = new FormData()
        this.setState({blinking: false})
    }

    handleRecName = e => {
        this.setState({rec_name: e.target.value})
    }

    render(){
        return(
            <div>
                {this.state.blinking
                ? <svg height="70" width="70" className="blinking">
                    <circle cx="50" cy="50" r="10" fill="#DA7B93" />
                </svg>   
                : <svg height="70" width="70">
                    <circle cx="50" cy="50" r="10" fill="#DA7B93" />
                </svg>   
                }   
                <h4 style={{float:'left'}}>Recording</h4>
                <input id='rec-title' placeholder='Recording name' onChange={e => this.handleRecName(e)}/>
                <button className='btn btn-outline-light' type='button' onClick={this.startRecording}>Start</button>
                <button className='btn btn-outline-light' type='button' onClick={this.stopRecording}>Stop</button>
                {this.state.rec_data.map(data => <Player data={data}/>)}
            </div>
        )
    }
}


export default Recording