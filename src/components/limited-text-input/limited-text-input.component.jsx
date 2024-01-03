import React, { useEffect, useState } from 'react'

import './limited-text-input.style.scss';

const LimitedTextInput = ({inputLabel, numberOfTextRows, numberOfCharacters, onChangeHandler, defaultValue}) => {

    const [input, setInput] = useState('');

    console.log(defaultValue);

    const inputLengthBelowLimit = () => input.length <= numberOfCharacters;

    const checkLimitAndTriggerHandler = () => {
        if(inputLengthBelowLimit()){
            onChangeHandler(input);
        } else if(!inputLengthBelowLimit()){
            onChangeHandler(false);
        }
    }

    useEffect(() => {
        if(defaultValue)
            setInput(defaultValue)
    }, [])

    useEffect(() => {
        checkLimitAndTriggerHandler()
    }, [input])

    return (
        <div className="limited-message-container">
            <div className="flex-space-between">
                <span>{inputLabel}</span>
                <span className={`${!inputLengthBelowLimit() && 'warning-text'}`}>{`${input.length}/${numberOfCharacters} Characters`}</span>
            </div>
            <textarea defaultValue={defaultValue} className="limited-message-text-area" onChange={e => setInput(e.target.value)} type='text' rows={numberOfTextRows}></textarea>
        </div>
    )
}

export default LimitedTextInput