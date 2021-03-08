import './App.css'
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser, clearSessionForm} from './redux/actions/actions'
import React from 'react'
import Navbar from './containers/Navbar'
import SessionContainer from './containers/SessionContainer'
import CalendarPage from './containers/CalendarPage'
import SessionView from './containers/SessionView'
import Welcome from './components/Welcome'
import Performance from './containers/Performance'

const BASE_URL = 'http://localhost:3000'
class App extends React.Component {
  
  persistUser = (token) => {
    fetch(`${BASE_URL}/persist`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      const { username, user_id, instrument, userSessions, userPerformances } = data
      data.username && this.props.setCurrentUser({username, user_id, instrument, userSessions, userPerformances})
    })
  }

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.persistUser(token)
    }
  }

  clearNewSession = () => {
    clearInterval(window.timer)
    window.timer = null
    this.props.clearSessionForm()
    if (!!document.getElementById('timer-count')){
      document.getElementById('timer-count').textContent = '00:00:00'
    }
    document.querySelectorAll('.lt-checkbox').forEach(box => box.checked = false)
    if (!!document.querySelector('#notes-text-area')) {
      document.querySelector('#notes-text-area').value = ''
    }
    if (!!document.querySelector('#players')){
      document.querySelector('#players').innerHTML = ''
    }
  }
  
  render(){
    return (
      <>    
        <Navbar historyRouterProp={this.props.history}/>
        {localStorage.token && 
          <>
            <Route exact path='/new-session' render={routerProps => <SessionContainer onLeave={this.clearNewSession()} clearNewSession={this.clearNewSession}/>} />
            <Route exact path='/history' render={() => <CalendarPage historyRouterProp={this.props.history}/>} />
            <Route exact path='/history/:id' render={routerProps => {
              if (this.props.userSessions.map(s => s.id).includes(parseInt(routerProps.match.params.id))) {
                return <SessionView routerProps={routerProps}/>
              }
            }}/>
            <Route exact path='/performance' render={() => <Performance/>}/>
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

export default withRouter(connect(mapStateToProps, {setCurrentUser, clearSessionForm})(App))