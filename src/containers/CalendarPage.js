import React from 'react'
import {connect} from 'react-redux'

import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

function CalendarPage(props){
    const localizer = momentLocalizer(moment)
    // const dates = [...new Set(props.userSessions.map(s => s.date))]

    const sessions = props.userSessions.map(sesh => {return {title:'session', start: sesh.date, end:sesh.date, allDay: false, resource: sesh.id}})

    return(
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <div style={{height:'1000px'}}>
            <Calendar
                localizer={localizer}
                events={sessions}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '750px', width:'900px' }}
                onSelectEvent={(e) => props.historyRouterProp.push(`/sessions/${e.resource}`)}
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