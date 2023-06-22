import React from 'react'

import './add-button.styles.scss';

const AddButtonComponent = ({onClickHandler, children}) => {
  return (
    <button onClick={onClickHandler ? e => onClickHandler(e) : e => {return undefined}} className={`add-button`}>
    {/*e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. ServiceCard)*/}
        {children}
    </button>
  )
}

export default AddButtonComponent