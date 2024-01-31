import { Fragment, useEffect, useState } from 'react'

import AddButton from '../buttons/add-button-component/add-button.component';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component';

import { getAllCountries } from '../../api/countries/read';

import './location-filter.styles.scss';
import AlertMessageComponent from '../alerts/alert-message.component';
import { errorMessageOptions } from '../alerts/alertMessageTypes';
import { toast } from 'react-toastify';

interface Props{
    defaultPostCode?: number;
    defaultCountry?: number;
    onConfirm: (selectedCountry: string, selectedPostCode: string) => void
}

interface Country{
    id: number;
    name: string;
}

const LocationFilter = ({defaultPostCode, defaultCountry, onConfirm}: Props) => {

    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(defaultCountry?.toString() || undefined);
    const [selectedPostCode, setSelectedPostCode] = useState<string | undefined>(defaultPostCode?.toString() || undefined);
    const [countries, setCountries] = useState<undefined | Country[]>(undefined);
    const [defaultCountryName, setDefaultCountryName] = useState<string>('');

    useEffect(() => {
        getAllCountries()
            .then(response => setCountries(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [])

    useEffect(() => {
        if(countries && defaultCountry)
        setDefaultCountryName(countries.filter((country) => {return country.id === defaultCountry})[0].name)
    }, [countries, defaultCountry])
    
    const selectFilterCountry = (countryId: number) => {
        setSelectedCountry(countryId.toString())
    }

    const confirmSelection = () => {
        if(selectedCountry && selectedPostCode)
        onConfirm(selectedCountry.toString(), selectedPostCode.toString());
    }

    return (
        <div className="location-filter-div">
            {countries &&
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