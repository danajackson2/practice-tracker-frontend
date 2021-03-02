import './App.css'
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/actions/actions'
import React from 'react'
import Navbar from './containers/Navbar'
import SessionContainer from './containers/SessionContainer'
import Calendar from './containers/Calendar'
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
            <Route exact path='/sessions' render={() => <Calendar  persistUser={this.persistUser}/>} />
            <Route path='/sessions/:id' render={routerProps => <SessionView persistUser={this.persistUser} routerProps={routerProps}/>}/>
          </>
        }
        <Route exact path='/' component={Welcome} />
      </>
    )
  }
}

export default withRouter(connect(null, {setCurrentUser})(App))