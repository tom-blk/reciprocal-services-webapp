import React from 'react'
import RatingStarComponent from '../rating-star-component/rating-star.component';

import './rate-user.styles.scss';

const RateUserComponent = ({rating, onSetRating}) => {

    const stars = [1,2,3,4,5];

    return (
        <div className='rate-user-component'>
            {
                stars.map(star => {
                    return(
                        <RatingStarComponent key={star} onClickHandler={() => onSetRating(star)} color={rating >= star ? '#ffbf00' : 'grey'}/>
                    )
                })
            }
        </div>
    )
}

export default RateUserComponent