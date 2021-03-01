import React from 'react'

function Player(props){


    // $(id) => { return document.getElementById(id); };
    // const media = document.getElementById('audio');

    // let ui = {
    // play: 'playAudio',
    // audio: 'audio',
    // percentage: 'percentage',
    // seekObj: 'seekObj',
    // currentTime: 'currentTime'
    // };

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

    // calculatePercentPlayed = () => {
    // let percentage = (media.currentTime / media.duration).toFixed(2) * 100;
    // $(ui.percentage).style.width = `${percentage}%`;
    // }

    // calculateCurrentValue = (currentTime) => {
    // const currentMinute = parseInt(currentTime / 60) % 60;
    // const currentSecondsLong = currentTime % 60;
    // const currentSeconds = currentSecondsLong.toFixed();
    // const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
    // currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    // }`;
    
    // return currentTimeFormatted;
    // }

//    initProgressBar = (e) => {
//         e.preventDefault()
//     const currentTime = calculateCurrentValue(media.currentTime);
//     $(ui.currentTime).innerHTML = currentTime;
//     $(ui.seekObj).addEventListener('click', seek);

//     media.onended = () => {
//         $(ui.play).classList.remove('pause');
//         $(ui.percentage).style.width = 0;
//         $(ui.currentTime).innerHTML = '00:00';
//     };

//     function seek(e) {
//         const percent = e.offsetX / this.offsetWidth;
//         media.currentTime = percent * media.duration;
//     }
    
    // calculatePercentPlayed();
    // }

    // $(ui.play).addEventListener('click', togglePlay)
    // $(ui.audio).addEventListener('timeupdate', initProgressBar);


    return (
        <div className="audio-player">
            <audio src={props.data.url} id={`audio${props.data.id}`} onEnded={endOfClip} onTimeUpdate={updateTime}/>
            <div className="container">
                <div className='row'>
                    <button className='btn-sm col-2' id={`playAudio${props.data.id}`} onClick={e => togglePlay(e)} style={{width:'30px', borderRadius:'20px'}}>{'>'}</button>
                    <div className='col-8'>{props.data.name}</div>
                    <div className='col-2'>
                        <p id={`time-left${props.data.id}`} style={{margin: '0 0 0 5px'}}>00:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player