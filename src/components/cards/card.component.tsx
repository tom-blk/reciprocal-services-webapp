import React from 'react'

import './card.styles.scss';

interface Props{
  onClickHandler: () => void;
  children: React.ReactNode;
}

const CardComponent = ({onClickHandler, children}: Props) => {
  return (
    <div className='card main-hover' onClick={e => onClickHandler()}>
        {children}
    </div>
  )
}

export default CardComponent
