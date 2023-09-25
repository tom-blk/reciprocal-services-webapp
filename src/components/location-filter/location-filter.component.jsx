import React, { useState } from 'react'

import AddButton from '../buttons/add-button-component/add-button.component';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component';

import { getAllCountries } from '../../api/countries/read';

import './location-filter.styles.scss';

const LocationFilter = ({defaultPostCode, defaultCountry, onConfirm}) => {

    const [selectedCountry, setSelectedCountry] = useState(defaultCountry || undefined);
    const [selectedPostCode, setSelectedPostCode] = useState(defaultPostCode || '');
    
    const selectFilterCountry = (countryId) => {
        setSelectedCountry(countryId)
    }

    const confirmSelection = () => {
        onConfirm(selectedCountry, selectedPostCode);
    }

    return (
        <div className="location-filter-div">
            <DropdownMenu defaultCountry={defaultCountry} getListContent={getAllCountries} onSelect={selectFilterCountry}/>
            <input className="text-area" defaultValue={defaultPostCode} placeholder="Select Postal Code" type="text" onChange={e => setSelectedPostCode(e.target.value)}/>
            <AddButton onClickHandler={confirmSelection}>Select</AddButton>
        </div>
    )
}

export default LocationFilter