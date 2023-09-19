import { useContext, useEffect, useState } from "react"

import LocationFilter from "../../components/location-filter/location-filter.component";
import SearchBar from "../../components/search-bar/search-bar.component"
import ProvidersList from "../../components/card-lists/providers-list/providers-list.component"
import PageContainer from "../../utils/page-container/page-container.component";
import Distancer from '../../utils/distancer/distancer.component';

import { AlertMessageContext } from "../../context/alert-message.context";
import { getUserList, getUsersInLocation } from "../../api/users/read";
import { UserContext } from "../../context/user.context";

import "./providers.styles.scss";

const Providers = () => {

    const { displayError } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);

    const [searchString, setSearchString] = useState('');
    const [providers, setProviders] = useState([]);

    const [filteredProviders, setFilteredProviders] = useState(providers);

    useEffect(() => {
        getUsersInLocation(user.id, user.country, user.postCode)
            .then(response => setProviders(response))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        if(providers)
        filterUsers();
    }, [searchString, providers])

    const selectLocationFilterPorperties = (countryId, postCode) => {
        getUsersInLocation(user.id, countryId, postCode)
            .then(response => setProviders(response))
            .catch(error => displayError(error))
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterUsers = () => {
        setFilteredProviders(
            providers.filter(
                user => {
                    if(user.firstName && user.lastName){
                        const fullUserName = user.firstName.concat(' ', user.lastName);
                        return fullUserName.toLocaleLowerCase().includes(searchString);
                    } else {
                        return user.userName.toLocaleLowerCase().includes(searchString);
                    }
                    
                }
            )
        )
    }

    return(
        <PageContainer>
            <LocationFilter defaultPostCode={user.postCode} defaultCountry={user.country} onConfirm={selectLocationFilterPorperties}/>
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