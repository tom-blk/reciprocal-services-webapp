import React from 'react'
import {ReactComponent as PenSVG} from '../../assets/vectors/pen.svg';

import './on-hover-edit.styles.scss';

export const OnHoverEdit = ({size, onClickFunction, children}) => {
  return (
    <div onClick={e => onClickFunction()} className={`on-hover-edit-container ${size}`}>
        <div className='on-hover-edit-children-div'>
            {children}
        </div>
        <div className='on-hover-edit-image'>
          <PenSVG />
        </div>
    </div>
    
    
  )
}
