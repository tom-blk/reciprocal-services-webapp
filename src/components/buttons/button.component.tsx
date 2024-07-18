import React, { useState } from 'react'

import './button.styles.scss';

interface ButtonProps{
  buttonType: string;
  className?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  additionalStyles?: React.CSSProperties;
}

const ButtonComponent = ({buttonType, onClickHandler, className, children, type, additionalStyles}: ButtonProps) => {

  const [mouseState, setMouseState] = useState<'initial' | 'button-mouse-enter' | 'button-mouse-leave'>('initial')

  return (
    <button 
        type={type} 
        //e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. ServiceCard)
        onClick={onClickHandler ? e => onClickHandler(e) : () => {return undefined}} 
        onMouseEnter={() => setMouseState(mouseState => 'button-mouse-enter')}
        onMouseLeave={() => setMouseState(mouseState => 'button-mouse-leave')}
        className={`button ${buttonType} ${className} ${mouseState}`}
        style={additionalStyles}
    >
        {children}
    </button>
  )
}

export default ButtonComponent
