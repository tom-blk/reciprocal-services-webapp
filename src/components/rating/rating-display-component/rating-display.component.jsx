import RatingStarComponent from '../rating-star-component/rating-star.component';

import './rating-display.styles.scss';

const RatingDisplayComponent = ({ rating }) => {
 
    const stars = [1,2,3,4,5];

    return(
        <div className='rating-container'>
            <div className={'stars-container'}>
                {stars.map(star => {
                    return(
                        <RatingStarComponent key={star} color={rating > star-0.5 ? '#ffbf00' : 'grey'}/>
                    )
                })}
            </div>
            <span className='rating-number'>{rating ? rating.toFixed(1) : '0.0'}</span>
        </div>
    )
}

export default RatingDisplayComponent