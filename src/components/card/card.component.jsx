import React from 'react'

import './card.styles.scss';

const CardComponent = ({onClickHandler, children}) => {
  return (
    <div className='card' onClick={e => onClickHandler()}>
        {children}
    </div>
  )
}

export default CardComponent