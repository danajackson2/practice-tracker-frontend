import React from 'react'
import {connect} from 'react-redux'

function SessionView(props){
    const session = props.sessions.filter(s => s.id === props.routerProps.match.params.id)
    console.log(props.sessions, props.routerProps.match.params.id)
    return(
        <div>
            Session View for id {props.routerProps.match.params.id}
        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sessions: state.current_user.userSessions
    }
}

export default connect(mapStateToProps)(SessionView)