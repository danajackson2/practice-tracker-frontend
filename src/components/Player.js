import React from 'react'
import './player.scss'

function Player(props){

    function $(id) { return document.getElementById(id); };
    const media = document.getElementById('audio');

    let ui = {
    play: 'playAudio',
    audio: 'audio',
    percentage: 'percentage',
    seekObj: 'seekObj',
    currentTime: 'currentTime'
    };

    function togglePlay(e) {
        e.preventDefault()
    if (!media.paused) {
        media.pause();
        $(ui.play).classList.remove('pause');
    } else {
        media.play();
        $(ui.play).classList.add('pause');
    }
    }

    function calculatePercentPlayed() {
    let percentage = (media.currentTime / media.duration).toFixed(2) * 100;
    $(ui.percentage).style.width = `${percentage}%`;
    }

    function calculateCurrentValue(currentTime) {
    const currentMinute = parseInt(currentTime / 60) % 60;
    const currentSecondsLong = currentTime % 60;
    const currentSeconds = currentSecondsLong.toFixed();
    const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    }`;
    
    return currentTimeFormatted;
    }

    function initProgressBar(e) {
        e.preventDefault()
    const currentTime = calculateCurrentValue(media.currentTime);
    $(ui.currentTime).innerHTML = currentTime;
    $(ui.seekObj).addEventListener('click', seek);

    media.onended = () => {
        $(ui.play).classList.remove('pause');
        $(ui.percentage).style.width = 0;
        $(ui.currentTime).innerHTML = '00:00';
    };

    function seek(e) {
        const percent = e.offsetX / this.offsetWidth;
        media.currentTime = percent * media.duration;
    }
    
    calculatePercentPlayed();
    }

    // $(ui.play).addEventListener('click', togglePlay)
    // $(ui.audio).addEventListener('timeupdate', initProgressBar);

    
    return (
        <div className="audio-player">
            <audio src={props.data.url} id='audio' onTimeUpdate={e => initProgressBar(e)}/>
            <div className="player-controls">
                <button id="playAudio" onClick={e => togglePlay(e)}></button>
                <div id="seekObjContainer">
                    <div id="seekObj">
                        <div id="percentage"></div>
                    </div>
                </div>
                <p><small id="currentTime">00:00</small></p>
            </div>
        </div>
    )
}

export default Player