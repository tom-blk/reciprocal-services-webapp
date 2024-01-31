import React, { useContext, useEffect, useState } from "react"

import LocationFilter from "../../components/location-filter/location-filter.component";
import SearchBar from "../../components/search-bar/search-bar.component"
import ProvidersList from "../../components/card-lists/providers-list/providers-list.component"
import PageContainer from "../../utils/page-container/page-container.component";
import Distancer from '../../utils/distancer/distancer.component';

import { getUsersInLocation } from "../../api/users/read";
import { UserContext } from "../../context/user.context";

import "./providers.styles.scss";
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions } from "../../components/alerts/alertMessageTypes";
import { toast } from "react-toastify";

const Providers = () => {

    const { user } = useContext(UserContext);
    const {id, userName, firstName, lastName, country, postCode} = user!;

    const [searchString, setSearchString] = useState('');
    const [providers, setProviders] = useState([]);

    const [filteredProviders, setFilteredProviders] = useState(providers);

    const selectLocationFilterPorperties = (countryId, postCode) => {
        getUsersInLocation(id, countryId, postCode)
            .then(response => setProviders(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    useEffect(() => {
        if(country && postCode){
        getUsersInLocation(id, country, postCode)
            .then(response => setProviders(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        }
    }, [id, country, postCode])

    useEffect(() => {
        const filterUsers = () => {
            setFilteredProviders(
                providers.filter(
                    user => {
                        if(firstName && lastName){
                            const fullUserName = firstName.concat(' ', lastName);
                            return fullUserName.toLocaleLowerCase().includes(searchString);
                        } else {
                            return userName.toLocaleLowerCase().includes(searchString);
                        }
                        
                    }
                )
            )
        }

        if(providers)
        filterUsers();
    }, [searchString, providers, firstName, lastName, userName])

    return(
        <PageContainer>
            <LocationFilter defaultPostCode={postCode} defaultCountry={country} onConfirm={selectLocationFilterPorperties}/>
            <SearchBar className="providers-search-bar" onSearchChange={onSearchChange} placeholder={"Providers"}/>
            <Distancer size={1}/>
            {
            filteredProviders.length > 0
            ?
            <ProvidersList users={filteredProviders}/>
            :
            <span className="no-items-in-list-notice">There are currently no providers in this location...</span>
            }
            
        </PageContainer>
    )
}

export default Providers