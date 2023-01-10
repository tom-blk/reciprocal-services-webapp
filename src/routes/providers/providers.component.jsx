import SearchBar from "../../components/search-bar/search-bar.component"
import { members } from "../../datamodels/members/members-examples"
import { useEffect, useState } from "react"
import ProvidersList from "../../components/providers-list/providers-list.component"

import "./providers.styles.scss";
import PageContainer from "../../utils/page-container/page-container.component";

import axios from "axios";

const Providers = () => {

    const [searchString, setSearchString] = useState('');
    const [providers, setProviders] = useState([]);

    const [filteredProviders, setFilteredProviders] = useState(providers);

    const a = axios;

    useEffect(() => {
        getProviders();
    }, [])

    useEffect(() => {
        filterProviders();
    }, [searchString])

    const getProviders = () => {
        a.get(`http://localhost:5000/get-all-users`)
        .then(response => {
            setProviders(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterProviders = () => {
        setFilteredProviders(
            providers.filter(
                provider => {
                    const fullProviderName = provider.first_name.concat(' ', provider.last_name);
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