import React from 'react'

import './button.styles.scss';

const ButtonComponent = ({buttonType, children}) => {
  return (
    <button className={`button ${buttonType}`}>
        {children}
    </button>
  )
}

export default ButtonComponent