import React from 'react'
import './background.styles.scss';
import LogoSpinner from '../../components/logo-spinner/logo-spinner.component';

const Background = ({children}) => {

const blinkers = [1,2,3,4,5,6,7,8];

  return (
    <div className='wrapper'>
        <div className='black-background-wrapper'>
          <div className="background-spinners">
            <div className='background-spinner'>
                <LogoSpinner size={'100%'} pulseSpeed={10}/>
            </div>
            <div className='background-spinner'>
                <LogoSpinner size={'30%'} pulseSpeed={10}/>
            </div>
          </div>
        </div>
        <div className='foreground'>
            {children}
        </div>
    </div>
  )
}

export default Background
