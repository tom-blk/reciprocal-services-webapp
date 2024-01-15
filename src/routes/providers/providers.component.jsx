import { useContext, useEffect, useState } from "react"

import LocationFilter from "../../components/location-filter/location-filter.component";
import SearchBar from "../../components/search-bar/search-bar.component"
import ProvidersList from "../../components/card-lists/providers-list/providers-list.component"
import PageContainer from "../../utils/page-container/page-container.component";
import Distancer from '../../utils/distancer/distancer.component';

import { AlertMessageContext } from "../../context/alert-message.context";
import { getUsersInLocation } from "../../api/users/read";
import { UserContext } from "../../context/user.context";

import "./providers.styles.scss";

const Providers = () => {

    const { displayError } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);
    const {id, userName, firstName, lastName, country, postCode} = user;

    const [searchString, setSearchString] = useState('');
    const [providers, setProviders] = useState([]);

    const [filteredProviders, setFilteredProviders] = useState(providers);

    const selectLocationFilterPorperties = (countryId, postCode) => {
        getUsersInLocation(id, countryId, postCode)
            .then(response => setProviders(response))
            .catch(error => displayError(error))
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    useEffect(() => {
        getUsersInLocation(id, country, postCode)
            .then(response => setProviders(response))
            .catch(error => displayError(error))
    }, [id, country, postCode, displayError])

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