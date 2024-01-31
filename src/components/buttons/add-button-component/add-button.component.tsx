import React from 'react'

import './add-button.styles.scss';

interface props{
  onClickHandler: (e: React.MouseEvent<HTMLElement>) => void;
  children: string;
}

const AddButton = ({onClickHandler, children}: props) => {
  return (
    <button onClick={onClickHandler ? e => onClickHandler(e) : e => {return undefined}} className={'button confirm add-button'}>
    {/*e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. Cards) so that THEIR onClick doesn't get triggered*/}
        {children}
    </button>
  )
}

export default AddButton