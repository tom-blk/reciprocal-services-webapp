import React, { useState } from 'react'

import './dropdown-menu.styles.scss';

const DropdownMenu = ({defaultCountry, content, onSelect}) => {

    const [dropdownIsActive, setDropdownIsActive] = useState(false);
    const [activeChoice, setActiveChoice] = useState(defaultCountry);

    const toggleDropdown = () => {
        setDropdownIsActive(!dropdownIsActive)
    }

    const chooseOption = (optionName, optionId) => {
        setActiveChoice(optionName);
        setDropdownIsActive(false);
        onSelect(optionId)
    }

    window.onclick = (e) => {
        if (!e.target.matches('.dropbtn')) {
            setDropdownIsActive(false);
        }
    }

    return (
        <div className="dropdown">
            <button onClick={() => toggleDropdown()} className={'dropbtn'}>{activeChoice ? activeChoice : 'Select Country'}</button>  
            <div className={`dropdown-content ${dropdownIsActive && 'show'}`}>
                
                {
                content&&
                content.map(option => (
                    <span key={option.id} onClick={() => {chooseOption(option.name, option.id)}}>{option.name}</span>
                ))
                }
            </div>
        </div>
    )
}

export default DropdownMenu