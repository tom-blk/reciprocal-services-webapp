import{ useState } from 'react'

import './limited-text-input.style.scss';

interface Props{
    inputLabel: string;
    numberOfTextRows: number;
    numberOfCharacters: number;
    onChangeHandler: (input: string) => void;
    defaultValue?: string;
}

const LimitedTextInput: React.FC<Props> = ({inputLabel, numberOfTextRows, numberOfCharacters, onChangeHandler, defaultValue}: Props) => {

    const defaultValueCheck = defaultValue ? defaultValue : '';

    const [input, setInput] = useState<string>(defaultValueCheck);

    const inputLengthBelowLimit = () => input.length === numberOfCharacters;

    const checkLimitAndSetInput = (userInput: string) => {
        if(userInput.length <= numberOfCharacters){
            setInput(userInput);
            onChangeHandler(userInput);
        }else{
            setInput(userInput.slice(0, numberOfCharacters))
            onChangeHandler(userInput.slice(0, numberOfCharacters))
        }
    }

    return (
        <div className="limited-message-container">
            <div className="flex-space-between">
                <span>{inputLabel}</span>
                <span className={`${inputLengthBelowLimit() && 'warning-text'}`}>{`${input.length}/${numberOfCharacters} Characters`}</span>
            </div>
            <textarea value={input} className="limited-message-text-area" onChange={e => checkLimitAndSetInput(e.target.value)} rows={numberOfTextRows}></textarea>
        </div>
    )
}

export default LimitedTextInput