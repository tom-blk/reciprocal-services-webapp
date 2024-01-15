import React, { useEffect, useState } from 'react'

import './limited-text-input.style.scss';

const LimitedTextInput = ({inputLabel, numberOfTextRows, numberOfCharacters, onChangeHandler, defaultValue, name}) => {

    const [input, setInput] = useState('');

    const inputLengthBelowLimit = () => input.length <= numberOfCharacters;

    const checkLimitAndSetInput = (input) => {
        setInput(input)
        if(input.length <= numberOfCharacters){
            onChangeHandler(input);
        } else {
            onChangeHandler(false);
        }
    }

    useEffect(() => {
        if(defaultValue)
            setInput(defaultValue)
    }, [defaultValue])

    return (
        <div className="limited-message-container">
            <div className="flex-space-between">
                <span>{inputLabel}</span>
                <span className={`${!inputLengthBelowLimit() && 'warning-text'}`}>{`${input.length}/${numberOfCharacters} Characters`}</span>
            </div>
            <textarea name={name} defaultValue={defaultValue} className="limited-message-text-area" onChange={e => checkLimitAndSetInput(e.target.value)} type='text' rows={numberOfTextRows}></textarea>
        </div>
    )
}

export default LimitedTextInput