import React, { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user.context';

import ember from '../../assets/images/ember.png';

import './ember-counter.styles.scss';

const EmberCounter = () => {

    const { user, fetchUser } = useContext(UserContext);

    const [visible, setVisible] = useState('init');

    const toggleEmberCounterVisibility = () => {
        if(visible==='init'){
            fetchUser();
            setVisible(true);
        } else {
            if(!visible)
            fetchUser();
            setVisible(!visible);
        }
    }

    return (
        <div className={`ember-counter-wrapper-container ${visible === 'init' ? '' : visible ? 'visible' : 'invisible'}`}>
            <div className='toggle-ember-counter-arrow main-hover' onClick={toggleEmberCounterVisibility}>{!visible ? <img className='ember-icon-toggle-button' src={ember}/> : "^"}</div>
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