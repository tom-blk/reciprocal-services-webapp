import React, { useEffect, useState } from 'react'

import './credit-counter.styles.scss';

const CreditCounter = () => {

    const [credits, setCredits] = useState(100);
    const [active, setActive] = useState(false);
    const [amount, setAmount] = useState(20);

    const triggerDecreaseCreditsEffect = () => {
        setActive(true);
        for(let i = 0; i < amount; i++){
            setCredits(credits - 1);
        }
    }

    return (
        <div className={`credit-counter-container ${active && 'active'}`}>
            <div>Your Credits:</div> 
            <span className={`credit-counter-number ${active && 'active'}`}>{credits}</span> 
            <button onClick={e => triggerDecreaseCreditsEffect()}>Test</button>
        </div>
    )
}

export default CreditCounter