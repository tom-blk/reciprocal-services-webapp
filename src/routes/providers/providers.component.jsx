import SearchBar from "../../components/search-bar/search-bar.component"
import { members } from "../../datamodels/members/members-examples"
import { useEffect, useState } from "react"
import ProvidersList from "../../components/providers-list/providers-list.component"

import "./providers.styles.scss";
import PageContainer from "../../utils/page-container/page-container.component";

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
        <PageContainer>
            <SearchBar className="providers-search-bar" onSearchChange={onSearchChange} placeholder={"Providers"}/>
            <ProvidersList providers={filteredProviders}/>
        </PageContainer>
    )
}

export default Providers