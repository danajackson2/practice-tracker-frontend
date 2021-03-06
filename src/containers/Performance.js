import React from 'react'
import {handlePerfData, sortPerfList, updatePerformances, selectPerf, changeSortListBy} from '../redux/actions/actions'
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
        props.selectPerf(0)
    }

    const sortBy = (param) => {
        return props.userPerformances?.sort((a, b) => a[param]?.localeCompare(b[param]))
    }

    const formatDate = date => {
        if (date !== '' && date !== null){
            let day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][new Date(date).getDay()]
            let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(date).getMonth()]
            let dayNum = (0 + date.split('-')[2]).slice(-2)
            dayNum = dayNum[0] === '0' ? dayNum.slice(1) : dayNum
            return `${day} ${month} ${dayNum}, ${date.split('-')[0]}`        
        }
    }

    return(
        <div className={'perf-page'}>
            <h1 >Add New Performance</h1>
            <form onSubmit={savePerf} className={'perf-form'}>
                <input className={'perf-input'} onChange={props.handlePerfData} name='date' type='date' placeholder='Piece' style={{width:'200px'}}></input>
                <input className={'perf-input'} onChange={props.handlePerfData} name='composer' placeholder='Composer'></input>
                <input className={'perf-input'} onChange={props.handlePerfData} name='piece' placeholder='Piece'></input>
                <input className={'perf-input'}  onChange={props.handlePerfData} name='event' placeholder='Event'></input>
                <button type='submit' className='btn btn-outline-light' style={{width:'200px', margin:'10px'}}>Submit</button>
            </form>
            <h1 style={{marginTop:'60px'}}>All Performances</h1>
            <div>
                <div style={{display:'flex', borderBottom: '1px solid white'}}>
                    <div onClick={() => props.changeSortListBy('date')} className={'add-hover-effect'} style={{width:'200px'}}>Date <span style={{fontSize:'16px'}}>▽</span></div>
                    <div onClick={() => props.changeSortListBy('composer')} className={'add-hover-effect'} style={{width:'250px'}}>Composer <span style={{fontSize:'16px'}}>▽</span></div>
                    <div onClick={() => props.changeSortListBy('piece')} className={'add-hover-effect'} style={{width:'250px'}}>Piece <span style={{fontSize:'16px'}}>▽</span></div>
                    <div onClick={() => props.changeSortListBy('event')} className={'add-hover-effect'} style={{width:'300px'}}>Event <span style={{fontSize:'16px'}}>▽</span></div>
                </div>
                {sortBy(props.sortListBy)?.map(perf => {
                    return perf.id === props.selectedPerfId
                    ? (
                        <div id={`perf${perf.id}`} className={'perf-row selected-perf'}>
                            <div style={{width:'200px'}}>{formatDate(perf.date)}</div>
                            <div style={{width:'250px'}}>{perf.composer}</div>
                            <div style={{width:'250px'}}>{perf.piece}</div>
                            <div style={{width:'300px'}}>{perf.event}</div>
                        </div>
                    )
                    : (
                        <div id={`perf${perf.id}`} className={'perf-row'}>
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
        userPerformances: state.current_user.userPerformances,
        selectedPerfId: state.selectedPerf,
        sortListBy: state.sortListBy
    }
}

export default connect(mapStateToProps, {handlePerfData, sortPerfList, updatePerformances, selectPerf, changeSortListBy})(Performance)
