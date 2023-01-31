import React from 'react'

import './button.styles.scss';

const ButtonComponent = ({buttonType, onClickHandler, children}) => {
  return (
    <button onClick={e => onClickHandler(e)} className={`button ${buttonType}`}>
    {/*e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. ServiceCard)*/}
        {children}
    </button>
  )
}

export default ButtonComponent