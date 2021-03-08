import React from 'react'
import C from '../drones/Cdrone.mp3'
import Cs from '../drones/Csdrone.mp3'
import D from '../drones/Ddrone.mp3'
import Ef from '../drones/Efdrone.mp3'
import E from '../drones/Edrone.mp3'
import F from '../drones/Fdrone.mp3'
import Fs from '../drones/Fsdrone.mp3'
import G from '../drones/Gdrone.mp3'
import Af from '../drones/Afdrone.mp3'
import A from '../drones/Adrone.mp3'
import Bf from '../drones/Bfdrone.mp3'
import B from '../drones/Bdrone.mp3'

const drones = {
    'C': C, 
    'C♯': Cs,
    'D': D,
    'E♭': Ef,
    'E' : E,
    'F': F,
    'F♯': Fs,
    'G': G,
    'A♭': Af,
    'A': A,
    'B♭': Bf,
    'B': B
}

// const drones = {
//     'C': 'http://faculty.washington.edu/brockman/TuningDrones/C-523p25-SineWave.mp3', 
//     'C♯': 'http://faculty.washington.edu/brockman/TuningDrones/Db-554p37-SineWave.mp3',
//     'D': 'http://faculty.washington.edu/brockman/TuningDrones/D-587p33-SineWave.mp3',
//     'E♭': 'http://faculty.washington.edu/brockman/TuningDrones/Eb-622p25-SineWave.mp3',
//     'E' : 'http://faculty.washington.edu/brockman/TuningDrones/E-659p26-SineWave.mp3',
//     'F': 'http://faculty.washington.edu/brockman/TuningDrones/F-698p46-SineWave.mp3',
//     'F♯': 'http://faculty.washington.edu/brockman/TuningDrones/Gb-739p99-SineWave.mp3',
//     'G': 'http://faculty.washington.edu/brockman/TuningDrones/G-783p99-SineWave.mp3',
//     'A♭': 'http://faculty.washington.edu/brockman/TuningDrones/Ab-830p61-SineWave.mp3',
//     'A': 'http://faculty.washington.edu/brockman/TuningDrones/A-440-SineWave.mp3',
//     'B♭': 'http://faculty.washington.edu/brockman/TuningDrones/Bb-446p16-SineWave.mp3',
//     'B': 'http://faculty.washington.edu/brockman/TuningDrones/B-493p88-SineWave.mp3'
// }

function Drones(){

    let drone= null
    let currentNote = ''

    const droneOnOff = (e, note) => {
        
        if (!drone) {
            drone = new Audio(drones[note])
            drone.play()
            currentNote = note
            e.target.className = 'note-div-sel'
        } else {
            // if (drone.src === drones[note]){
            if (('/' + drone.src.split('/').slice(-3).join('/')) === drones[note]){
                drone.pause()
                drone = null
                e.target.className = 'note-div'
                currentNote = ''
            } else {
                drone.pause()
                drone = null
                drone = new Audio(drones[note])
                drone.play()
                e.target.className = 'note-div-sel'
                document.getElementById(currentNote).className = 'note-div'
                currentNote = note
            }
        
        }
    }

    return(
        <div className={'toolbox-unit'}>
            <h4 style={{marginTop:'10px'}}>Drones</h4>
            <p>{'( A 440 )'}</p>
            <hr style={{margin:'5px 15px 15px 15px'}}></hr>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <div className={'note-div'} id={'C'} onClick={(e) => droneOnOff(e, 'C')}>C</div>
                    <div className={'note-div'} id={'C♯'} onClick={(e) => droneOnOff(e, 'C♯')}>C♯</div>
                    <div className={'note-div'} id={'D'} onClick={(e) => droneOnOff(e, 'D')}>D</div>
                    <div className={'note-div'} id={'E♭'} onClick={(e) => droneOnOff(e, 'E♭')}>E♭</div>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <div className={'note-div'} id={'E'} onClick={(e) => droneOnOff(e,'E')}>E</div>
                    <div className={'note-div'} id={'F'} onClick={(e) => droneOnOff(e, 'F')}>F</div>
                    <div className={'note-div'} id={'F♯'} onClick={(e) => droneOnOff(e, 'F♯')}>F♯</div>
                    <div className={'note-div'} id={'G'} onClick={(e) => droneOnOff(e, 'G')}>G</div>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <div className={'note-div'} id={'A♭'} onClick={(e) => droneOnOff(e, 'A♭')}>A♭</div>
                    <div className={'note-div'} id={'A'} onClick={(e) => droneOnOff(e, 'A')}>A</div>
                    <div className={'note-div'} id={'B♭'} onClick={(e) => droneOnOff(e, 'B♭')}>B♭</div>
                    <div className={'note-div'} id={'B'} onClick={(e) => droneOnOff(e, 'B')}>B</div>
                </div>
            </div>
        </div>
    )
}

export default Drones