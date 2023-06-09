import React from 'react'
import './background.styles.scss';

const Background = ({children}) => {
  return (
    <div className='wrapper'>
        <div className='background-component'/>
        <div className='foreground'>
            {children}
        </div>
    </div>
  )
}

export default Background
