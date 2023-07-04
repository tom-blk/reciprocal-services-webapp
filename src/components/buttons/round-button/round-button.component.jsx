import './round-button.styles.scss';

const RoundButton = ({size, onClickHandler, type}) => {

    console.log(size)

    return(
            <button 
                onClick={e => onClickHandler(e)}
                style={{height: size, width: size}} 
                className={`button confirm round-button round-button-${type}`}
            />
    )
}

export default RoundButton