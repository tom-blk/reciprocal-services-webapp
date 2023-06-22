import React from 'react'
import {ReactComponent as EditSVG} from '../../assets/vectors/edit.svg';

import './on-hover-edit.styles.scss';

const OnHoverEdit = ({size, onClickFunction, children}) => {
  return (
    <div onClick={e => onClickFunction()} className={`on-hover-edit-container ${size}`}>
        <div className='on-hover-edit-children-div'>
            {children}
        </div>
        <div className='on-hover-edit-image'>
          <EditSVG />
        </div>
    </div>
    
    
  )
}

export default OnHoverEdit
