import React, { Component } from 'react'
import click from '../media/click.wav'

export default class Metronome extends Component {
    constructor(){
        super()

        this.state = {
            playing: false,
            bpm: 100,
        }
        this.click = new Audio(click)
    }

    handleBpmChange = e => {
        const bpm = e.target.value
        if(this.state.playing) {
            clearInterval(this.timer)
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
            this.setState({
                bpm
            })
        } else {
            this.setState({ bpm })
        }
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
                    playing: true,
                },
                this.playClick
            )
        }
    }

    playClick = () => {
        this.click.play()
    }
    

    render() {
        const { playing, bpm } = this.state

        return (
            <div className='metronome' style={{display:'flex', flexDirection:'column', borderStyle: 'solid', borderWidth:'1px', borderRadius:'10px', marginBottom:'20px'}}>
                <div className='bpm-slider'>
                    <h5>{bpm} BPM </h5>
                    <input type='range' min='40' max='208' value={bpm} onChange={this.handleBpmChange}/>
                    <form className='bpm-input' style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                        <input style={{width:'100px'}} type='number' value={bpm} onChange={this.handleBpmChange} />
                    </form>
                </div>
                <button type='button' className='btn btn-outline-light' onClick={this.startStop}>
                    {playing ? 'Stop' : 'Play'}
                </button>
                
            </div>
        )
    }
}