import React from 'react'
import Calendar from '../components/Calendar'
import SessionView from '../components/SessionView'

function ViewContainer(){
    return(
        <div>
            <h1>View Container</h1>
            <Calendar />
            <SessionView />
        </div>
    )
}

export default ViewContainer