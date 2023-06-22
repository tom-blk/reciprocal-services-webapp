import './close-button.styles.scss';
import { ReactComponent as CrossSymbol} from '../../assets/vectors/cross.svg';

const CloseButton = ({onClickHandler, color}) => {
  return (
    <div 
        className='close-button'
        onClick={e => onClickHandler()}
    >
            <CrossSymbol style={{color: 'white'}}/>
    </div>
  )
}

export default CloseButton