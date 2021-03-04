import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {createStore} from 'redux' 
import {Provider} from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import someReducer from './redux/reducers/someReducer'

const store = createStore(
  someReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
 
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

export default store