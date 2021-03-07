import React from 'react'
import {handlePerfData, sortPerfList, updatePerformances} from '../redux/actions/actions'
import {connect} from 'react-redux'

const BASE_URL = 'http://localhost:3000'

function Performance(props){

    const savePerf = (e) => {
        if (e.target.querySelectorAll('input')[0].value !== ''){
            e.preventDefault()
            fetch(`${BASE_URL}/performances`, {
                method:'POST',
                headers: {
                    'content-type':'application/json',
                    Authorization: `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({...props.performance, user_id: props.user_id})
            })
            .then(res => res.json())
            .then(data => props.updatePerformances(data))
        } else{
            alert('Must include date for performance')
        }
        Array.from(e.target.querySelectorAll('input')).forEach(i => i.value = '')
    }

    const sortBy = (param) => {
        let sorted = props.userPerformances.sort((a, b) => a[param].localeCompare(b[param]))
        props.sortPerfList(sorted)
    }

    const formatDate = date => {
        if (date !== '' && date !== null){
            let day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][new Date(date).getDay()]
            let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(date).getMonth()]
            let dayNum = date.split('-')[2]?.replace('0', '')
            return `${day} ${month} ${dayNum}, ${date.split('-')[0]}`        
        }
    }

    return(
        <div style={{display:'flex', alignItems:'center', marginTop:'40px', flexDirection:'column'}}>
            <h1 >Add New Performance</h1>
            <form onSubmit={savePerf} style={{display:'flex', flexDirection:'column', width:'400px', border:'1px solid white', alignItems:'center', padding:'20px'}}>
                <input onChange={props.handlePerfData} name='date' type='date' placeholder='Piece' style={{width:'200px', margin:'10px', fonstSize:'20px'}}></input>
                <input onChange={props.handlePerfData} name='composer' placeholder='Composer' style={{width:'300px', margin:'10px', fonstSize:'20px'}}></input>
                <input onChange={props.handlePerfData} name='piece' placeholder='Piece' style={{width:'300px', margin:'10px', fonstSize:'20px'}}></input>
                <input onChange={props.handlePerfData} name='event' placeholder='Event' style={{width:'300px', margin:'10px', fonstSize:'20px'}}></input>
                <button type='submit' className='btn btn-outline-light' style={{width:'200px', margin:'10px'}}>Submit</button>
            </form>
            <h1 style={{marginTop:'60px'}}>All Performances</h1>
            <div style={{display:'flex', flexDirection:'column', width:'1000px', margin:'20px'}}>
                <div style={{display:'flex', borderBottom: '1px solid white'}}>
                    <div onClick={() => sortBy('date')} className={'add-hover-effect'} style={{width:'200px'}}>Date <span style={{fontSize:'16px'}}>▽</span></div>
                    <div onClick={() => sortBy('composer')} className={'add-hover-effect'} style={{width:'250px'}}>Composer <span style={{fontSize:'16px'}}>▽</span></div>
                    <div onClick={() => sortBy('piece')} className={'add-hover-effect'} style={{width:'250px'}}>Piece <span style={{fontSize:'16px'}}>▽</span></div>
                    <div onClick={() => sortBy('event')} className={'add-hover-effect'} style={{width:'300px'}}>Event <span style={{fontSize:'16px'}}>▽</span></div>
                </div>
                {props.userPerformances.map(perf => {
                    return (
                        <div style={{display:'flex', fontSize:'20px', overflow:'hidden'}}>
                            <div style={{width:'200px'}}>{formatDate(perf.date)}</div>
                            <div style={{width:'250px'}}>{perf.composer}</div>
                            <div style={{width:'250px'}}>{perf.piece}</div>
                            <div style={{width:'300px'}}>{perf.event}</div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user_id: state.current_user.user_id,
        performance: state.performance,
        userPerformances: state.current_user.userPerformances
    }
}

export default connect(mapStateToProps, {handlePerfData, sortPerfList, updatePerformances})(Performance)
