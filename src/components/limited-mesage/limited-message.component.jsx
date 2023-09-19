import React, { useEffect, useState } from 'react'

import './limited-message.style.scss';

const LimitedMessage = ({numberOfTextRows, numberOfCharacters, onChangeHandler}) => {

    const [message, setMessage] = useState('');

    const messageLengthBelowLimit = () => message.length <= numberOfCharacters;

    const checkLimitAndTriggerHandler = () => {
        if(messageLengthBelowLimit()){
            onChangeHandler(message);
        } else if(!messageLengthBelowLimit()){
            onChangeHandler(false);
        }
    }

    useEffect(() => {
        console.log(messageLengthBelowLimit());
    }, [message])

    useEffect(() => {
        checkLimitAndTriggerHandler()
    }, [message])

    return (
        <div className="limited-message-container">
            <div className="flex-space-between">
                <span>Message:</span>
                <span className={`${!messageLengthBelowLimit() && 'warning-text'}`}>{`${message.length}/${numberOfCharacters} Characters`}</span>
            </div>
            <textarea className="limited-message-text-area" onChange={e => setMessage(e.target.value)} type='text' rows={numberOfTextRows}></textarea>
        </div>
    )
}

export default LimitedMessage