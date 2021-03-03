import React from 'react'
const BASE_URL = 'http://localhost:3000'

function Player(props){
    
    const togglePlay = (e) => {
        e.preventDefault()
        const media = document.getElementById(`audio${props.data.id}`)
        const btn = document.getElementById(`playAudio${props.data.id}`)
        if (!media.paused) {
            media.pause();
            btn.textContent = '>'
        } else {
            media.play();
            btn.textContent = '||'
        }
    }

    const endOfClip = () => {
        document.getElementById(`playAudio${props.data.id}`).textContent = '>'
    }

    const updateTime = () => {
        const media = document.getElementById(`audio${props.data.id}`)
        let timeSec = media.duration - media.currentTime
        let minutes = ('0' + Math.floor(timeSec/60)).slice(-2)
        let seconds = ('0' + (Math.floor(timeSec) % 60)).slice(-2)
        document.getElementById(`time-left${props.data.id}`).textContent = `${minutes}:${seconds}`
    }

    const deleteRecording = id => {
        fetch(`${BASE_URL}/recordings/${id}`,{
            method:'DELETE',
            headers: {Authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => res.json())
        .then(data => console.log(data.message))
        document.querySelector(`#audio${props.data.id}`).parentElement.remove()
    }
    
    return (
        <div className="audio-player">
            <audio src={props.data.url} id={`audio${props.data.id}`} onEnded={endOfClip} onTimeUpdate={updateTime}/>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', fontSize:'20px'}}>
                <button className='btn btn-outline-light' id={`playAudio${props.data.id}`} onClick={e => togglePlay(e)} style={{width:'40px', height:'40px', borderRadius:'20px', margin:'0px'}}>{'>'}</button>
                <div>{props.data.name}<span onClick={() => window.confirm('Are you sure you want to delete this recording?') && deleteRecording(props.data.id)}> 🗑</span></div>
                <p id={`time-left${props.data.id}`}>00:00</p>

            </div>
        </div>
    )
}

export default Player