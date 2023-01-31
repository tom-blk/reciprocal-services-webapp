import React from 'react';

import './alert.styles.scss';

const AlertComponent = ({alertType, children}) => {
  return (
    <div className={`alert ${alertType}`}>
        {children}
    </div>
  )
}

export default AlertComponent