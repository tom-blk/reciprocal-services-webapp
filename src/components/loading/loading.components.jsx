import React from 'react'

import './loading.styles.scss';

export const LoadingComponentBars = () => {
  return (
    <div className='loading-component-bars-container'>
        <div className='loading-component-bar'></div>
        <div className='loading-component-bar'></div>
    </div>
  )
}

export const LoadingComponentCirlce = () => {
  return (
    <div className='loading-component-circle-container'>
        <div className='loading-component-circle'></div>
    </div>
  )
}
