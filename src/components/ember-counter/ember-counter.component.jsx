import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user.context';

import {ReactComponent as Arrow} from '../../assets/vectors/arrow.svg';

import ember from '../../assets/images/ember.png';

import './ember-counter.styles.scss';

const EmberCounter = () => {

    const { user, fetchUser } = useContext(UserContext);

    const [visible, setVisible] = useState('init');

    const toggleEmberCounterVisibility = () => {
        console.log('triggered')
        if(visible==='init'){
            fetchUser();
            setVisible(true);
        } else {
            if(!visible)
            fetchUser();
            setVisible(!visible);
        }
    }

    const returnArrowClass = () => {
        if(visible === 'init'){
            return
        }else if(visible === true){
            return 'ember-counter-arrow-down'
        }else if(visible === false){
            return 'ember-counter-arrow-up'
        }
    }

    return (
        <div className={`ember-counter-wrapper-container ${visible === 'init' ? '' : visible ? 'visible' : 'invisible'}`}>
            <div className={`toggle-ember-counter-arrow main-hover`} onClick={toggleEmberCounterVisibility}>
                <Arrow className={returnArrowClass()} fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
            </div>
            <div className={`ember-counter-container  ${visible === 'init' ? '' : visible && 'visible'}`}>
                <div className='ember-counter-data-container'>
                    <img alt='ember icon' className='ember-icon' src={ember}/>
                    <span>Your Embers: </span>
                    <span className='bold'>{user.credits}</span> 
                </div>
            </div>
        </div>
    )
}

export default EmberCounter