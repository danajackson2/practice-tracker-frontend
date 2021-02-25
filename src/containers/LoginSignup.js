import React from 'react'
import {connect} from 'react-redux'
import {formOnChange, setCurrentUser} from '../redux/actions/actions'

function LoginSignup(props){

    const BASE_URL = 'http://localhost:3000'

    const handleAuthResponse = (data) => {
        if (data.username) {
            const { username, id, instrument, token } = data
            localStorage.setItem('token', token)
            props.setCurrentUser({username, instrument, id})
            props.historyRouterProp.push('/new-session')
        } else {
            alert(data.error)
        }
    }

    const login = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/login`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(props.state.login)
        })
        .then(res => res.json())
        .then(data => handleAuthResponse(data))
    }

    const signup = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/users`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({user: props.state.signup})
        })
        .then(res => res.json())
        .then(data => handleAuthResponse(data))
    }

    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Log In
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{padding:'10px'}}>
                    <form onSubmit={login}>  
                        <input className='menu-item' onChange={e => props.formOnChange(e, 'login')} name='username' placeholder='username'></input>
                        <input className='menu-item' onChange={e => props.formOnChange(e, 'login')} name='password' placeholder='password' type='password'></input>
                        <button className='btn'>submit</button>
                    </form>
                </ul>
            </li>
            <li className="nav-item dropdown" style={{marginRight:'150px'}}>
                <button className="nav-link dropdown-toggle btn" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Sign Up
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{padding:'10px'}}>
                    <form onSubmit={signup}>  
                        <input className='menu-item' onChange={e => props.formOnChange(e, 'signup')} placeholder='username' name='username'></input>
                        <input className='menu-item' onChange={e => props.formOnChange(e, 'signup')} placeholder='instrument' name='instrument'></input>
                        <input className='menu-item' onChange={e => props.formOnChange(e, 'signup')} placeholder='password' type='password' name='password'></input>
                        <button className='btn'>submit</button>
                    </form>
                </ul>
            </li>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

export default connect(mapStateToProps, {formOnChange, setCurrentUser})(LoginSignup)