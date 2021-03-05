import './App.css'
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/actions/actions'
import React from 'react'
import Navbar from './containers/Navbar'
import SessionContainer from './containers/SessionContainer'
import CalendarPage from './containers/CalendarPage'
import SessionView from './containers/SessionView'
import Welcome from './components/Welcome'

const BASE_URL = 'http://localhost:3000'
class App extends React.Component {
  
  persistUser = (token) => {
    fetch(`${BASE_URL}/persist`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      const { username, user_id, instrument, userSessions } = data
      data.username && this.props.setCurrentUser({username, user_id, instrument, userSessions})
    })
  }

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.persistUser(token)
    }
  }
  
  render(){
    return (
      <>    
        <Navbar historyRouterProp={this.props.history}/>
        {localStorage.token && 
          <>
            <Route exact path='/new-session' render={() => <SessionContainer />} />
            <Route exact path='/sessions' render={() => <CalendarPage historyRouterProp={this.props.history}/>} />
            <Route exact path='/sessions/:id' render={routerProps => {
              if (this.props.userSessions.map(s => s.id).includes(parseInt(routerProps.match.params.id))) {
                return <SessionView routerProps={routerProps}/>
              }
            }}/>
          </>
        }
        <Route exact path='/' component={Welcome} />
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    userSessions: state.current_user.userSessions
  }
}

export default withRouter(connect(mapStateToProps, {setCurrentUser})(App))