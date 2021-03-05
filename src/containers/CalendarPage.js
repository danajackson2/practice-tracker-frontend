import React from 'react'
import {connect} from 'react-redux'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

function CalendarPage(props){
    const localizer = momentLocalizer(moment)

    // calendar puts events one day too early! this is to correct.
    const addDay = (date) => {
        const correctDayNum = parseInt(date.split('-')[2]) + 1
        const correctDay = ('0' + correctDayNum).slice(-2)
        return `${date.split('-')[0]}-${date.split('-')[1]}-${correctDay}`
    }

    const sessions = props.userSessions?.map((sesh) => {
        return {
            title:`Session ${sesh.id}`, 
            start: addDay(sesh.date), 
            end: addDay(sesh.date), 
            allDay: false, 
            resource: sesh.id}
    })

    return(
        <div style={{display:'flex', alignItems:'center', flexDirection:'column', marginTop:'40px'}}>
            <div style={{height:'1000px'}}>
            <Calendar
                localizer={localizer}
                events={sessions}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '750px', width:'900px' }}
                onSelectEvent={(e) => props.historyRouterProp.push(`/sessions/${e.resource}`)}
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
        userSessions: state.current_user.userSessions
    }
}

export default connect(mapStateToProps)(CalendarPage)