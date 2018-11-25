import React from 'react'
import { Image } from 'rebass'
import './styles.css'

class Review extends React.Component {
    render() {
        return <div className='review-container'>
            <div className='review-profile-container'>
                <Image
                    src={'https://lh3.googleusercontent.com/NhlscU1IYVQ0NweIkaVlvwmAz5HhqGcfbxgyyetnFZW7Q0wW8DTt4U909wvdgMFndM4aM8nLvP8H4FnDBUHH=w642-h950'}
                    className="review-profile-img"
                />
                <div className='review-profile-username'>username</div>
            </div>
            <div className='review-content'>content</div>
        </div>
    }
}

export default Review;