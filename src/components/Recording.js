import React from 'react'
import Player from './Player'
// npm install mic-recorder-to-mp3
const MicRecorder = require('mic-recorder-to-mp3')
const recorder = new MicRecorder({bitRate: 128})
let formData = new FormData()
class Recording extends React.Component {

    state = {
        blinking: false,
        // recording: null,
        rec_data: [],
        rec_name: ''
    }

    startRecording = () => {
        recorder.start()
        // .then(() => {console.log('recording started')})
        // .catch((e) => {console.error(e)})
        this.setState({blinking: true})
    }

    stopRecording = () => {
        recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
            // const file = new File(buffer, 'recording.mp3', {
            //     type: blob.type,
            //     lastModified: Date.now()
            // })
            // this.setState({recording: file})
            formData.append('data[recording]', blob)
            formData.append('data[name]', this.state.rec_name)
        })
        // .catch((e) => {
        //     alert('We could not retrieve your message')
        //     console.log(e)
        // })
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

    // playRecording = () => {
    //     if (!!this.state.recording){
    //         const player = new Audio(URL.createObjectURL(this.state.recording))
    //         player.id='audioplayer'
    //         player.play()
    //     }
    // }

    // saveRecording = () => {
    //     if (!!this.state.recording && !formData.recording){
    //         return fetch('http://localhost:3000/recordings',{
    //             method: 'POST',
    //             headers: {Authorization: `Bearer ${localStorage.token}`},
    //             body: formData
    //         })
    //         .then(res => res.json())
    //         .then(data => this.setState({rec_data: [...this.state.rec_data, data]}))
    //     }
    //     formData = new FormData()
    // }

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
                <button className='btn btn-outline-light' type='button' onClick={this.playRecording}>Play</button>
                <button className='btn btn-outline-light' type='button' onClick={this.saveRecording}>Save</button>
                {this.state.rec_data.map(data => <Player data={data}/>)}
            </div>
        )
    }
}


export default Recording