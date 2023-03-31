import React from 'react'
import Banner from '../banner/banner.component';
import ButtonComponent from '../button/button.component'

import './footer.styles.scss';

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='left-footer-container'>
            <Banner type={'footer'}/>
            <div>Sign Up and build YOUR community!</div>
            <ButtonComponent buttonType={'confirm'}>Sign Up</ButtonComponent>   
        </div>
        <div className='center-footer-container'>
            <div style={{fontWeight: 'bold'}}>Quick Links</div>
            <div>Sign Up</div>
            <div>Code</div>
        </div>
        <div className='right-footer-container'>
            <div style={{fontWeight: 'bold'}}>Quick Links</div>
            <div>Sign Up</div>
            <div>Code</div>
        </div>
    </div>
  )
}

export default Footer
