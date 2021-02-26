import React from 'react'
import LoginSignup from './LoginSignup'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/actions/actions'


const Navbar = (props) => {

    const logout = () => {
        localStorage.clear()
        props.setCurrentUser({})
        props.historyRouterProp.push('/')
    }

    const {username, instrument} = props.state.current_user
    return(
        <div>
            <NavLink id='top-name' to='/'><h1 >PracTrac</h1></NavLink>
            <h4 style={{textAlign:'center', color:'white'}}>{username ? `Hi, ${username }, time to practice your ${instrument}!` : ''}</h4>
            <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {Object.keys(props.state.current_user).length > 0
                        ? <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className='btn nav-item'><NavLink to='/new-session'>New Session</NavLink></li>
                                <li className='btn nav-item'><NavLink to='/past-sessions'>Past Sessions</NavLink></li>
                            </ul >
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item btn ms-auto"><button className='btn' onClick={logout}>Log Out</button></li>
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
        state: state
    }
}

export default connect(mapStateToProps, {setCurrentUser})(Navbar)