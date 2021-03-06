import React from 'react'
import Player from './Player'
import {connect} from 'react-redux'
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
            formData.append('data[userId]', this.props.userId)
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
        document.getElementById('rec-title').value = ''
    }

    handleRecName = e => {
        this.setState({rec_name: e.target.value})
    }

    render(){
        return(
            <div className='col' style={{display:'flex', flexDirection:'column', height:'300px'}}>
                <h4 style={{alignSelf:'flex-start'}}>Recording</h4>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <input id='rec-title' placeholder='Recording name' onChange={e => this.handleRecName(e)}/>
                    <div>
                        <button className='btn btn-outline-light' type='button' style={{padding:'5px', width:'50px'}} onClick={this.startRecording}>Start</button>
                        <button className='btn btn-outline-light' type='button' style={{padding:'5px', width:'50px', marginLeft:'10px'}} onClick={this.stopRecording}>Stop</button>
                    </div>
                    {this.state.blinking
                    ? <img src={'/circle.png'} style={{height:'30px'}} className='blinking' alt={'blinking circle'}/>    
                    : <img src={'/circle.png'} style={{height:'30px'}} alt={'circle'}/>   
                    }   
                    </div>
                    <div id='players' style={{display:'flex', flexDirection:'column', marginTop:'10px', overflow:'auto'}}>
                        {this.state.rec_data.map(data => <Player data={data} deleteOption={true}/>)}
                    </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.current_user.user_id
    }
}

export default connect(mapStateToProps)(Recording)