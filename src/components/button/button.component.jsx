import React from 'react'

import './button.styles.scss';

const ButtonComponent = ({buttonType, children}) => {
  return (
    <div className={`button ${buttonType}`}>
        {children}
    </div>
  )
}

export default ButtonComponent