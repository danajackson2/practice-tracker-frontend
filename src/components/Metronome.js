import React, { Component } from 'react'
import click1 from '../metronome_files/click1.wav'
import click2 from '../metronome_files/click2.wav'

export default class Metronome extends Component {
    constructor(){
        super()

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 1,
        }

        this.click1 = new Audio(click1)
        this.click2 = new Audio(click2)
    }

    handleBpmChange = e => {
        const bpm = e.target.value
        if(this.state.playing) {
            clearInterval(this.timer)
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000)

            this.setState({
                count: 0,
                bpm
            })
        } else {
            this.setState({ bpm })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state.bpm)
    }

    startStop = () => {
        if(this.state.playing) {
            clearInterval(this.timer)
            this.setState({
                playing: false
            })
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            )
            this.setState(
                {
                    count: 0,
                    playing: true,
                },
                this.playClick
            )
        }
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state
        if(count % beatsPerMeasure === 0) {
            this.click2.play()
        } else {
            this.click1.play()
        }
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }))
    }

    render() {
        const { playing, bpm } = this.state
        
        return (
            <div className='metronome' style={{display:'flex', flexDirection:'column', borderStyle: 'solid', borderWidth:'1px', borderRadius:'10px', marginBottom:'20px', minHeight:'250px', justifyContent:'space-between'}}>
                <h4>Metronome</h4>
                <hr style={{margin:'5px'}}></hr>
                <div className='bpm-slider'>
                    <h5>{bpm} BPM </h5>
                    <input type='range' min='40' max='208' value={bpm} onChange={this.handleBpmChange}/>
                    <form className='bpm-input' style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                        <input style={{width:'100px'}} type='number' value={bpm} onChange={this.handleBpmChange} />
                        {/* <input type='submit' value='Set'/> */}
                    </form>
                </div>
                <button type='button' className='btn btn-outline-light' onClick={this.startStop}>
                    {playing ? 'Stop' : 'Play'}
                </button>
                
            </div>
        )
    }
}