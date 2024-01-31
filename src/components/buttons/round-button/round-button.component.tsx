import React from 'react';

import {ReactComponent as EditSVG} from '../../../assets/vectors/edit.svg'
import {ReactComponent as ConfirmSVG} from '../../../assets/vectors/confirm.svg'

import './round-button.styles.scss';

interface props{
    type: string;
    onClickHandler: (e: React.MouseEvent<HTMLElement>) => void
}

const RoundButtonComponent = ({type, onClickHandler}: props) => {

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