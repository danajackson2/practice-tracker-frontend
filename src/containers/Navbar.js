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
        document.querySelector('ul.navbar-drop-user').classList.remove('show')
        document.querySelector('span.navbar-drop-user').classList.remove('show')
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
        Array.from(e.target.querySelectorAll('input')).forEach(i => i.value = '')
    }

    const deleteUser = () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`${BASE_URL}/users/${props.current_user.user_id}`, {
                method:'DELETE',
                headers: {Authorization: `Bearer ${localStorage.token}`}
            })
        logout()
        }
    }

    const getAvgFocus = () => {
        if (props.current_user.userSessions[0].focus_rating !== null) {
            let focus = props.current_user.userSessions.map(sesh => sesh.focus_rating).reduce((a,b) => a+b, 0)/props.current_user.userSessions.length
            return focus.toFixed(2)
        }
    }

    const getAvgProd = () => {
        if (props.current_user.userSessions[0].prod_rating !== null) {
            let prod = props.current_user.userSessions.map(sesh => sesh.prod_rating).reduce((a,b) => a+b, 0)/props.current_user.userSessions.length
            return prod.toFixed(2)
        }
    }

    const getAvgSession = () => {
        if (props.current_user.userSessions[0].duration !== '') {
            let minsArr = props.current_user.userSessions.map(sesh => {
                let time = sesh.duration.split(':')
                return time[2]/60 + time[1]/1 + time[0]*60  
            })
            return Math.round(minsArr.reduce((a,b) => a+b)/minsArr.length)
        }
    }

    const getTotalHrs = () => {
        if (props.current_user.userSessions[0].duration !== '') {
            let minsArr = props.current_user.userSessions.map(sesh => {
                let time = sesh.duration.split(':')
                return time[2]/60 + time[1]/1 + time[0]*60  
            })
            return Math.round(minsArr.reduce((a,b) => a+b)/60)
        }
    }
    const {username, instrument} = props.current_user
    
    return(
        <div >
            <div style={{display:'flex', justifyContent:'center', margin:'5px 0px 15px 0px'}}>
                <NavLink id='top-name' to='/'><img src='logo1.png' width='200px' alt='logo'/></NavLink>
            </div>
            <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.token
                        ? <>
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <NavLink to='/new-session' className='btn add-hover-effect' style={{marginLeft:'100px'}}>New Session</NavLink>
                                <NavLink to='/history' className='btn add-hover-effect' style={{textDecoration:'none'}}>History</NavLink>
                            </div >
                            <h3 style={{height:'30px', overflow:'hidden', maxWidth:'600px'}}>{username ? `Hi ${username }, time to practice your ${instrument}!` : ''}</h3>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                 <li className="nav-item dropdown" style={{marginRight:'20px'}}>
                                    <span className="nav-link dropdown-toggle btn navbar-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                        Stats
                                    </span>
                                    <ul className="dropdown-menu navbar-drop" aria-labelledby="navbarDropdown" style={{padding:'10px', width:'250px'}}>
                                        <li>Avg Focus: <span style={{fontWeight:'600'}}>{getAvgFocus()}/10</span></li>
                                        <li>Avg Productivity: <span style={{fontWeight:'600'}}>{getAvgProd()}/10</span></li>
                                        <li>Avg Session: <span style={{fontWeight:'600'}}>{getAvgSession()} min</span></li>
                                        <li>Total Time: <span style={{fontWeight:'600'}}>{getTotalHrs()} hr</span></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown" style={{marginRight:'10px'}}>
                                    <span className="nav-link dropdown-toggle btn navbar-drop navbar-drop-user"  data-bs-toggle="dropdown" aria-expanded="false">
                                        Edit User
                                    </span>
                                    <ul className="dropdown-menu navbar-drop-user" aria-labelledby="navbarDropdown" style={{padding:'10px'}}>
                                        <form onSubmit={(e) => editUser(e, props.current_user)} style={{marginRight:'10px'}}>  
                                            <input className='menu-item' placeholder={`${props.current_user.username}`} name='username'></input>
                                            <input className='menu-item' placeholder={`${props.current_user.instrument}`} name='instrument'></input>
                                            <button className='btn'>Submit</button>
                                        </form>
                                        <button className='btn' onClick={deleteUser}>⚠️Delete User</button>
                                    </ul>
                                </li>
                                <li className="nav-item ms-auto btn " style={{color:'white', marginRight:'100px'}} onClick={logout}><a className='add-hover-effect'>Log Out</a></li>
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