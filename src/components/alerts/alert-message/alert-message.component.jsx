import React from 'react';

import './alert-message.styles.scss';

const AlertMessageComponent = ({alertType, children}) => {
  return (
    <div className={`alert ${alertType}`}>
        {children}
    </div>
  )
}

export default AlertMessageComponent