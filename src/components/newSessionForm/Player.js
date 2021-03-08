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
        let timeSec = document.getElementById(`audio${props.data.id}`).duration
        let minutes = ('0' + Math.floor(timeSec/60)).slice(-2)
        let seconds = ('0' + (Math.floor(timeSec) % 60)).slice(-2)
        document.getElementById(`time-left${props.data.id}`).textContent = `${minutes}:${seconds}`
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
            <audio src={props.data.url} id={`audio${props.data.id}`} onEnded={endOfClip} onTimeUpdate={updateTime} onLoadedMetadata={updateTime}/>
            <div className={'player-controls'}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <button className='btn btn-outline-light audio-play-btn' id={`playAudio${props.data.id}`} onClick={e => togglePlay(e)}>{'>'}</button>
                    {props.deleteOption && <span className='btn trashcan' onClick={() => window.confirm('Are you sure you want to delete this recording?') && deleteRecording(props.data.id)} >🗑</span>}   
                    </div>
                <div style={{textOverflow:'ellipsis'}}>{props.data.name}</div>
                <div id={`time-left${props.data.id}`}>{''}</div> 
            </div>
        </div>
    )
}

export default Player