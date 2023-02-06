import { ReactComponent as Star} from '../../assets/vectors/star.svg'

import './rating-star.styles.css';

const RatingStarComponent = ({ clickable }) => {

    return(
        <div className={`star-container ${clickable ? 'clickable' : null}`}>
            <Star style={{color: 'yellow'}}/>
        </div>
    )
}

export default RatingStarComponent