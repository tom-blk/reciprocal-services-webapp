import React from 'react'

import './button.styles.scss';

interface ButtonProps{
  buttonType: string;
  className?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

const ButtonComponent = ({buttonType, onClickHandler, className, children, type}: ButtonProps) => {
  return (
    <button type={type} onClick={onClickHandler ? e => onClickHandler(e) : e => {return undefined}} className={`button ${buttonType} ${className}`}>
    {/*e has to be passed to the onClickHandler to prevent event propagation to possible underlying components (ex. ServiceCard)*/}
        {children}
    </button>
  )
}

export default ButtonComponent