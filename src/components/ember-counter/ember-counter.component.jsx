import React, { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user.context';

import ember from '../../assets/images/ember.png';

import './ember-counter.styles.scss';

const EmberCounter = () => {

    const { user } = useContext(UserContext);

    const [visible, setVisible] = useState('init');

    const toggleEmberCounterVisibility = () => {
        if(visible==='init'){
            setVisible(true)
        } else {
            setVisible(!visible);
        }
    }

    useEffect(() => {
        console.log(visible)
    }, [visible])
    

    return (
        <div className={`ember-counter-wrapper-container ${visible === 'init' ? '' : visible ? 'visible' : 'invisible'}`}>
            <div className='toggle-ember-counter-arrow main-hover' onClick={toggleEmberCounterVisibility}>^</div>
            <div className={`ember-counter-container  ${visible === 'init' ? '' : visible && 'visible'}`}>
                <div className='ember-counter-data-container'>
                    <img className='ember-icon' src={ember}/>
                    <span>Your Embers: </span>
                    <span className='bold'>{user.credits}</span> 
                </div>
            </div>
        </div>
    )
}

export default EmberCounter