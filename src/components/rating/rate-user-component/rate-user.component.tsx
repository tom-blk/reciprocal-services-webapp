import RatingStarComponent from '../rating-star-component/rating-star.component';

import './rate-user.styles.scss';

interface Props{
    rating: number | undefined;
    onSetRating: (star: number) => void
}

const RateUserComponent = ({rating, onSetRating}: Props) => {

    const stars = [1,2,3,4,5];

    const returnColor = (star: number) => {
        if(rating && rating >= star){
            return '#ffbf00'
        }
        return 'grey'
    }

    return (
        <div className='rate-user-component'>
            {
                stars.map(star => {
                    return(
                        <RatingStarComponent key={star} onClickHandler={() => onSetRating(star)} color={returnColor(star)}/>
                    )
                })
            }
        </div>
    )
}

export default RateUserComponent