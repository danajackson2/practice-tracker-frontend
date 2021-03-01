import React from 'react'
import {connect} from 'react-redux'
import {handleRating} from '../../redux/actions/actions'

function Ratings(props){
    return (
        <>
            <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                <h4>Productivity : {props.prod_rating}/10</h4>
                <input type="range" min="1" max="10" defaultValue='5' className="slider" onChange={e => props.handleRating(e.target.value, 'prod_rating')}/>
            </div>
            <div className='col' style={{borderColor:'white', borderWidth:'1px', borderStyle:'solid'}}>
                <h4>Focus : {props.focus_rating}/10</h4>
                <input type="range" min="1" max="10" defaultValue='5' className="slider" onChange={e => props.handleRating(e.target.value, 'focus_rating')}/>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        prod_rating: state.session.prod_rating,
        focus_rating: state.session.focus_rating,
    }
}

export default connect(mapStateToProps, {handleRating})(Ratings)