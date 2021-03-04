import React from 'react'
import LoginSignup from './LoginSignup'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser, updateUser} from '../redux/actions/actions'
const BASE_URL = 'http://localhost:3000'

const Navbar = (props) => {

    const logout = () => {
        localStorage.clear()
        props.setCurrentUser({})
        props.historyRouterProp.push('/')
    }

    const editUser = (e, user) => {
        e.preventDefault()
        document.querySelector('ul.dropdown-menu').classList.remove('show')
        let update = {id: user.user_id}
        Array.from(e.target.querySelectorAll('input')).forEach(input => update[input.name] = input.value === '' ? user[input.name] : input.value)
        fetch(`${BASE_URL}/users/${user.user_id}`, {
            method:'PATCH',
            headers: {
                'content-type':'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(update)
        })
        .then(res => res.json())
        .then(user => props.updateUser(user))
    }

    const {username, instrument} = props.current_user
    
    return(
        <div >
            {/* <NavLink id='top-name' to='/'><h1 >PracTrac</h1></NavLink> */}
            <div style={{display:'flex', justifyContent:'center', margin:'5px 0px 15px 0px'}}>
                <NavLink id='top-name' to='/'><img src='logo1.png' width='200px' alt='logo'/></NavLink>
            </div>
            {/* <h4 style={{textAlign:'center', color:'white'}}>{username ? `Hi ${username }, time to practice your ${instrument}!` : ''}</h4> */}
            <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.token
                        ? <>
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <NavLink to='/new-session' className='btn' style={{textDecoration:'none', color:'white', marginLeft:'100px'}}>New Session</NavLink>
                                <NavLink to='/sessions' className='btn' style={{textDecoration:'none', color:'white'}}>Past Sessions</NavLink>
                            </div >
                            <h4 style={{textAlign:'center', color:'white'}}>{username ? `Hi ${username }, time to practice your ${instrument}!` : ''}</h4>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown" style={{marginRight:'10px'}}>
                                    <span className="nav-link dropdown-toggle btn" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        Edit User
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{padding:'10px'}}>
                                        <form onSubmit={(e) => editUser(e, props.current_user)} style={{marginRight:'10px'}}>  
                                            <input className='menu-item' placeholder={`${props.current_user.username}`} name='username'></input>
                                            <input className='menu-item' placeholder={`${props.current_user.instrument}`} name='instrument'></input>
                                            <button className='btn'>submit</button>
                                        </form>
                                    </ul>
                                </li>
                                <li className="nav-item ms-auto btn" style={{color:'white', marginRight:'100px'}} onClick={logout}>Log Out</li>
                            </ul>
                        </>
                        :
                        <LoginSignup historyRouterProp={props.historyRouterProp}/>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        current_user: state.current_user
    }
}

export default connect(mapStateToProps, {setCurrentUser, updateUser})(Navbar)