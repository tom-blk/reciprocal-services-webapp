import React from 'react'

const AlertComponent = ({alertType, children}) => {
  return (
    <div className={`alert ${alertType}`}>
        {children}
    </div>
  )
}

export default AlertComponent