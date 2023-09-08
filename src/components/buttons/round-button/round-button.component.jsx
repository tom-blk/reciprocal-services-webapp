import {ReactComponent as EditSVG} from '../../../assets/vectors/edit.svg'
import {ReactComponent as ConfirmSVG} from '../../../assets/vectors/confirm.svg'

import './round-button.styles.scss';

const RoundButtonComponent = ({type, onClickHandler, size}) => {

    const renderButton = () => {
        if(type === 'edit'){
            return <EditSVG fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
        }else if(type === 'confirm'){
            return <ConfirmSVG fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
        }
    }   

    return(
        <button
            onClick={e => onClickHandler(e)} 
            className={`button round-button main-hover`}
        >
            { renderButton() }
        </button>
    )
}

export default RoundButtonComponent