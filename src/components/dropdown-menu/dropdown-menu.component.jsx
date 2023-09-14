import React, { useEffect, useState, useContext } from 'react'

import { AlertMessageContext } from '../../context/alert-message.context';

import './dropdown-menu.styles.scss';

const DropdownMenu = ({getListContent, onSelect}) => {

    const { displayError } = useContext(AlertMessageContext);

    const [dropdownIsActive, setDropdownIsActive] = useState(false);
    const [dropdownContent, setDropDownContent] = useState([]);
    const [activeChoice, setActiveChoice] = useState(undefined);

    useEffect(() => {
        getListContent()
            .then(response => setDropDownContent(response))
            .catch(error => displayError(error))
    }, [])
  
    const toggleDropdown = () => {
        setDropdownIsActive(!dropdownIsActive)
    }

    const chooseOption = (option, optionId) => {
        setActiveChoice(option);
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
                {dropdownContent.map(option => (
                    <span key={option.id} onClick={() => {chooseOption(option.name, option.id)}}>{option.name}</span>
                ))}
            </div>
        </div>
    )
}

export default DropdownMenu