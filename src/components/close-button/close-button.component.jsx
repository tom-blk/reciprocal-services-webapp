import './close-button.styles.scss';
import { ReactComponent as CrossSymbol} from '../../assets/vectors/cross.svg';

const CloseButton = ({onClickHandler}) => {
  return (
    <div 
        className='close-button'
        onClick={e => onClickHandler()}
    >
            <CrossSymbol/>
    </div>
  )
}

export default CloseButton