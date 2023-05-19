import SearchBar from "../../components/search-bar/search-bar.component"
import { useContext, useEffect, useState } from "react"
import ProvidersList from "../../components/providers-list/providers-list.component"

import "./providers.styles.scss";
import PageContainer from "../../utils/page-container/page-container.component";

import { AlertMessageContext } from "../../context/alert-message.context";
import { getUserList } from "../../api/users/read";
import { UserContext } from "../../context/user.context";

const Providers = () => {

    const { displayError } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);

    const [searchString, setSearchString] = useState('');
    const [providers, setProviders] = useState([]);

    const [filteredProviders, setFilteredProviders] = useState(providers);

    useEffect(() => {
        getUserList(user.id, displayError).then(response => setProviders(response));
    }, [])

    useEffect(() => {
        if(providers)
        filterUsers();
    }, [searchString, providers])

    

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
            <SearchBar className="providers-search-bar" onSearchChange={onSearchChange} placeholder={"Providers"}/>
            <ProvidersList users={filteredProviders}/>
        </PageContainer>
    )
}

export default Providers