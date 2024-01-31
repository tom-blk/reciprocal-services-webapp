import React from 'react'
import './background.styles.scss';

const Background = ({children}) => {
  return (
    <div className='wrapper'>
        <div className='black-background-wrapper'>
          <div className='double-blur'>
            <div className='background-component'/>
          </div>
        </div>
        <div className='foreground'>
            {children}
        </div>
    </div>
  )
}

export default Background
