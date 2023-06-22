import React from 'react'

import './add-button.styles.scss';

const AddButton = ({onClickHandler, children}) => {
  return (
    <button onClick={onClickHandler ? e => onClickHandler(e) : e => {return undefined}} className={'button confirm add-button'}>
    {/*e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. Cards) so that THEIR onClick doesn't get triggered*/}
        {children}
    </button>
  )
}

export default AddButton