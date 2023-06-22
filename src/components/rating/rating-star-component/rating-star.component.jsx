import { ReactComponent as Star} from '../../../assets/vectors/star.svg'

import './rating-star.styles.css';

const RatingStarComponent = ({ starNumber, onClickHandler, color }) => {

    return(
        <div onClick={e => onClickHandler(starNumber)} className={'star-container'}>
            <Star style={{color: color, verticalAlign: 'middle'}}/>
        </div>
    )
}

export default RatingStarComponent