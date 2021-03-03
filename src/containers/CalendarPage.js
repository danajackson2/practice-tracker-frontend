import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


function CalendarPage(props){

    const dates = [...new Set(props.userSessions.map(s => s.date))]

    return(
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>

            <div>
                {dates.map(date => {
                    return <div>
                        <h2>{date}</h2>
                        {props.userSessions.filter(s => s.date === date).map(sesh => {
                            return <div>
                                {<Link to={`sessions/${sesh.id}`}><h4>{`${sesh.date}, ${sesh.duration}`}</h4></Link>}
                            </div>
                        })}
                    </div>
                })}
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