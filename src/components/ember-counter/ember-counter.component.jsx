import React, { useState } from 'react'

import './ember-counter.styles.scss';

const EmberCounter = () => {

    const [credits, setCredits] = useState(100);
    const [active, setActive] = useState(false);

    const triggerDecreaseCreditsEffect = () => {
        setActive(true);
        const amount = 20;
        let count = credits
        for(let i = 0; i < amount; i++){
            setCredits(credits-1)
        }
    }

    return (
        <div className={`credit-counter-container ${active && 'active'}`}>
            <div>Your Embers:</div> 
            <span className={`credit-counter-number ${active && 'active'}`}>{credits}</span> 
            <button onClick={e => triggerDecreaseCreditsEffect()}>Test</button>
        </div>
    )
}

export default EmberCounter