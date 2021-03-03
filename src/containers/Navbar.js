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
        <div style={{marginBottom:'40px'}}>
            {/* <NavLink id='top-name' to='/'><h1 >PracTrac</h1></NavLink> */}
            <div style={{display:'flex', justifyContent:'center', margin:'20px 0px 10px 0px'}}>
                <NavLink id='top-name' to='/'><img src='logo1.png' width='200px'/></NavLink>
            </div>
            <h4 style={{textAlign:'center', color:'white'}}>{username ? `Hi, ${username }, time to practice your ${instrument}!` : ''}</h4>
            <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.token
                        ? <>
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <NavLink to='/new-session' className='btn' style={{textDecoration:'none', color:'white'}}>New Session</NavLink>
                                <NavLink to='/sessions' className='btn' style={{textDecoration:'none', color:'white'}}>Past Sessions</NavLink>
                            </div >
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item ms-auto btn" style={{color:'white'}} onClick={logout}>Log Out</li>
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