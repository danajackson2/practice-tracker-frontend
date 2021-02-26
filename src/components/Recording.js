import React from 'react'
import {handleRecording} from '../redux/actions/actions' 
import {connect} from 'react-redux'
// npm install mic-recorder-to-mp3
const MicRecorder = require('mic-recorder-to-mp3')
const recorder = new MicRecorder({bitRate: 128})
// let formData = new FormData()
class Recording extends React.Component {

    state = {
        blinking: false,
        recording: null
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
            const file = new File(buffer, 'recording.mp3', {
                type: blob.type,
                lastModified: Date.now()
            })
            this.setState({recording: file})
            // formData.append('recording', blob)
        })
        debugger
        // .catch((e) => {
        //     alert('We could not retrieve your message')
        //     console.log(e)
        // })
        this.setState({blinking: false})
    }

    playRecording = () => {
        if (!!this.state.recording){
            const player = new Audio(URL.createObjectURL(this.state.recording))
            player.play()
        }
    }

    saveRecording = () => {
        
        if (!!this.state.recording){
            this.props.handleRecording(this.state.recording)
        }
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
                <button className='btn btn-outline-light' type='button' onClick={this.startRecording}>Start</button>
                <button className='btn btn-outline-light' type='button' onClick={this.stopRecording}>Stop</button>
                <button className='btn btn-outline-light' type='button' onClick={this.playRecording}>Play</button>
                <button className='btn btn-outline-light' type='button' onClick={this.saveRecording}>Save</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.current_user.user_id
    }
}

export default connect(mapStateToProps, {handleRecording})(Recording)