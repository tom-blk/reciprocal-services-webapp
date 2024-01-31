import { ReactComponent as Star} from '../../../assets/vectors/star.svg'

import './rating-star.styles.css';

interface Props{
    onClickHandler?: () => void;
    color: string;
}

const RatingStarComponent = ({ onClickHandler, color }: Props) => {

    const onClick = () => {
        if(onClickHandler){
            onClickHandler()
        }
    }

    return(
        <div onClick={e => onClick()} className={'star-container'}>
            <Star style={{color: color, verticalAlign: 'middle'}}/>
        </div>
    )
}

export default RatingStarComponent