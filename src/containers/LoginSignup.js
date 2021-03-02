import React from 'react'
import {connect} from 'react-redux'
import {formOnChange, setCurrentUser, handlePrevPracData} from '../redux/actions/actions'

function LoginSignup(props){

    const BASE_URL = 'http://localhost:3000'

    const handleAuthResponse = (data) => {
        if (data.username) {
            const { username, user_id, instrument, userSessions, token } = data
            localStorage.setItem('token', token)
            props.setCurrentUser({username, instrument, user_id, userSessions})
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
            body: JSON.stringify(props.login)
        })
        .then(res => res.json())
        .then(data => {
            handleAuthResponse(data)//does this line need a return?
            getPrevPracData(data.user_id)
        })
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

    const getPrevPracData = user_id => {
        fetch(`${BASE_URL}/prac-data`,{
            method:'POST',
            headers: {
                'content-type':'application/json', 
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({user_id: user_id})
        })
        .then(res => res.json())
        .then(data => props.handlePrevPracData(data))
    }

    // const getUserSessions = user_id => {
    //     fetch(`http://localhost:3000/sessions/${user_id}`,{  
    //         headers: {Authorization: `Bearer ${localStorage.token}`}
    //     })
    //     .then(res => res.json())
    //     .then(data => props.handleUserSessions(data))
    // }

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
        state: state,
        login: state.login
    }
}

export default connect(mapStateToProps, {formOnChange, setCurrentUser, handlePrevPracData})(LoginSignup)