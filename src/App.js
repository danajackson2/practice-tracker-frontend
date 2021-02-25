import './App.css'
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/actions/actions'
import React from 'react'
import Navbar from './containers/Navbar'
import SessionContainer from './containers/SessionContainer'
import ViewContainer from './containers/ViewContainer'
import Welcome from './components/Welcome'

const BASE_URL = 'http://localhost:3000'
class App extends React.Component {

  persistUser = (token) => {
    fetch(`${BASE_URL}/persist`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      const { username, id, instrument } = data
      data.username && this.props.setCurrentUser({username, id, instrument})
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
            <Route exact path='/past-sessions' render={() => <ViewContainer />} />
          </>
        }
        <Route exact path='/' component={Welcome} />
      </>
    )
  }
}

export default withRouter(connect(null, {setCurrentUser})(App))