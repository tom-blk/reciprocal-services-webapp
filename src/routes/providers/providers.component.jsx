import SearchBar from "../../components/search-bar/search-bar.component"
import { members } from "../../datamodels/members/members-examples"
import { useEffect, useState } from "react"
import ProvidersList from "../../components/providers-list/providers-list.component"

const Providers = () => {

    const [searchString, setSearchString] = useState('');
    const [fetchedProviders, setFetchedProviders] = useState(members);

    const [filteredProviders, setFilteredProviders] = useState(fetchedProviders);

    useEffect(() => {
        filterProviders();
    }, [searchString])

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterProviders = () => {
        setFilteredProviders(
            fetchedProviders.filter(
                provider => {
                    const fullProviderName = provider.firstName.concat(' ', provider.lastName);
                    return fullProviderName.toLocaleLowerCase().includes(searchString);
                }
            )
        )
    }

    return(
        <div className="providers-container">
            <SearchBar className="providers-search-bar" onSearchChange={onSearchChange}/>
            <ProvidersList providers={filteredProviders}/>
        </div>
    )
}

export default Providers