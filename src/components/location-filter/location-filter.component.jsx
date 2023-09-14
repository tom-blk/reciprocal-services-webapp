import React, { useState } from 'react'

import ButtonComponent from '../buttons/button.component';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component';

import { getAllCountries } from '../../api/countries/read';

import './location-filter.styles.scss';

const LocationFilter = ({onConfirm}) => {

    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [selectedPostCode, setSelectedPostCode] = useState('');
    
    const selectFilterCountry = (countryId) => {
        setSelectedCountry(countryId)
    }

    const confirmSelection = () => {
        onConfirm(selectedCountry, selectedPostCode);
    }

    return (
        <div className="location-filter-div">
            <DropdownMenu getListContent={getAllCountries} onSelect={selectFilterCountry}/>
            <input className="text-area" placeholder="Select Postal Code" type="text" onChange={e => setSelectedPostCode(e.target.value)}/>
            <ButtonComponent buttonType={'confirm'} onClickHandler={confirmSelection}>Confirm</ButtonComponent>
        </div>
    )
}

export default LocationFilter