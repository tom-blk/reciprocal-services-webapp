import React, { Fragment, useContext, useEffect, useState } from 'react'

import AddButton from '../buttons/add-button-component/add-button.component';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component';

import { getAllCountries } from '../../api/countries/read';

import './location-filter.styles.scss';
import { AlertMessageContext } from '../../context/alert-message.context';

const LocationFilter = ({defaultPostCode, defaultCountry, onConfirm}) => {

    const {displayError} = useContext(AlertMessageContext);

    const [selectedCountry, setSelectedCountry] = useState(defaultCountry || undefined);
    const [selectedPostCode, setSelectedPostCode] = useState(defaultPostCode || '');
    const [countries, setCountries] = useState(undefined);
    const [defaultCountryName, setDefaultCountryName] = useState(undefined);

    useEffect(() => {
        getAllCountries()
            .then(response => setCountries(response))
            .catch(error => displayError(error))
    }, [displayError])

    useEffect(() => {
        if(countries && defaultCountry)
        setDefaultCountryName(countries.filter((country) => {return country.id === defaultCountry})[0].name)
    }, [countries, defaultCountry])
    
    const selectFilterCountry = (countryId) => {
        setSelectedCountry(countryId)
    }

    const confirmSelection = () => {
        onConfirm(selectedCountry, selectedPostCode);
    }

    return (
        <div className="location-filter-div">
            {(countries && defaultCountryName) &&
            <Fragment>
                <DropdownMenu defaultCountry={defaultCountryName} content={countries} onSelect={selectFilterCountry}/>
                <input className="text-area" defaultValue={defaultPostCode} placeholder="Select Postal Code" type="text" onChange={e => setSelectedPostCode(e.target.value)}/>
                <AddButton onClickHandler={confirmSelection}>Select</AddButton>
            </Fragment>
            }
        </div>
    )
}

export default LocationFilter