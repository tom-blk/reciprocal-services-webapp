import React from 'react'

const ButtonComponent = ({buttonType, children}) => {
  return (
    <div className={`button ${buttonType}`}>
        {children}
    </div>
  )
}

export default ButtonComponent