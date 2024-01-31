import{ useState } from 'react'

import './dropdown-menu.styles.scss';

interface Country{
    id: number;
    name: string;
}

interface Props{
    defaultCountry?: string;
    content: Country[];
    onSelect: (optionId: number) => void;
}

const DropdownMenu = ({defaultCountry, content, onSelect}: Props) => {

    const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false);
    const [activeChoice, setActiveChoice] = useState(defaultCountry);

    const toggleDropdown = () => {
        setDropdownIsActive(!dropdownIsActive)
    }

    const chooseOption = (optionName: string, optionId: number) => {
        setActiveChoice(optionName);
        setDropdownIsActive(false);
        onSelect(optionId)
    }

    window.onclick = (e: MouseEvent) => {
        if(e.target){
            const target = e.target as HTMLElement
            if (!target.matches('.dropbtn')) {
                setDropdownIsActive(false);
            }
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