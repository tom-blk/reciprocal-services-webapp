import React from 'react'

import './on-hover-edit.styles.scss';

export const OnHoverEdit = ({children}) => {
  return (
    <div className='on-hover-edit-container'>
        <div className='on-hover-edit-children-div'>
            {children}
        </div>
        <img className='on-hover-edit-image' src={'https://www.svgrepo.com/download/433660/pen-o.svg'}/>
    </div>
    
    
  )
}
