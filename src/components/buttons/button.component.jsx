import React from 'react'

import './button.styles.scss';

const ButtonComponent = ({buttonType, onClickHandler, className, children}) => {
  return (
    <button onClick={onClickHandler ? e => onClickHandler(e) : e => {return undefined}} className={`button ${buttonType} ${className}`}>
    {/*e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. ServiceCard)*/}
        {children}
    </button>
  )
}

export default ButtonComponent