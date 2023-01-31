import './close-button.styles.scss';

const CloseButton = ({onClickHandler}) => {
  return (
    <div 
        className='close-button'
        onClick={e => {onClickHandler()}}
    >
            &times;
    </div>
  )
}

export default CloseButton