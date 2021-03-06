import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

function CalendarPage(props){
    //performance events purple
    Array.from(document.getElementsByClassName('rbc-event-content')).filter(el => el.textContent.includes('Performance')).forEach(item => item.parentElement.style.backgroundColor = '#2E151B')

    const localizer = momentLocalizer(moment)
    
    // calendar puts events one day too early! this is to correct.
    const addDay = (date) => {
        const correctDayNum = parseInt(date.split('-')[2]) + 1
        const correctDay = ('0' + correctDayNum).slice(-2)
        return `${date.split('-')[0]}-${date.split('-')[1]}-${correctDay}`
    }

    const createEvents = () => {
        let events = []
        props.userSessions?.forEach((sesh => {
            events.push({
                title:`Session ${sesh.id}`, 
                start: addDay(sesh.date), 
                end: addDay(sesh.date), 
                allDay: false, 
                resource: sesh.id
            })
        }))
        props.userPerformances?.forEach((perf => {
            events.push({
                title:`Performance ${perf.id}`, 
                start: addDay(perf.date), 
                end: addDay(perf.date), 
                allDay: false, 
                resource: perf.id
            })
        }))
        return events
    }

    const selectEvent = e => {
        e.title.includes('Session')
        ? props.historyRouterProp.push(`/history/${e.resource}`)
        : props.historyRouterProp.push(`/performance`)
    }
    
    return(
        <div style={{display:'flex', alignItems:'center', flexDirection:'column', marginTop:'40px'}}>
            <NavLink to='/performance' className='btn add-hover-effect' style={{textDecoration:'none'}}><button className='btn btn-outline-light'>Add a Performance</button></NavLink>
            <div style={{height:'1000px'}}>
            <Calendar
                localizer={localizer}
                events={createEvents()}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '750px', width:'900px' }}
                onSelectEvent={selectEvent}
                popup={true}
                views={['month']}
            />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user_id: state.current_user.user_id,
        userSessions: state.current_user.userSessions,
        userPerformances: state.current_user.userPerformances
    }
}

export default connect(mapStateToProps)(CalendarPage)