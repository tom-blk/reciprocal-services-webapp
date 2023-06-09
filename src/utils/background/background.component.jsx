import React from 'react'
import './background.styles.scss';

const Background = ({children}) => {
  return (
    <div className='wrapper'>
        <div className='black-background-wrapper'>
            <div className='background-component'/>
        </div>
        <div className='foreground'>
            {children}
        </div>
    </div>
  )
}

export default Background
