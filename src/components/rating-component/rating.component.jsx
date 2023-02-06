import { ReactComponent as Star} from '../../assets/vectors/star.svg'
import RatingStarComponent from '../rating-star-component/rating-star.component';

import './rating.styles.css';

const RatingComponent = ({ rating }) => {

    return(
        <div className='rating-container'>
            <div className="stars-container">
                <RatingStarComponent clickable/>
                <RatingStarComponent clickable/>
                <RatingStarComponent clickable/>
                <RatingStarComponent clickable/>
                <RatingStarComponent clickable/>
            </div>
            <span className='rating-number'>{rating}</span>
        </div>
    )
}

export default RatingComponent