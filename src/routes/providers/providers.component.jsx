import SearchBar from "../../components/search-bar/search-bar.component"
import { useContext, useEffect, useState } from "react"
import ProvidersList from "../../components/providers-list/providers-list.component"

import "./providers.styles.scss";
import PageContainer from "../../utils/page-container/page-container.component";

import axios from "axios";
import { AlertMessageContext } from "../../context/alert-message.context";

const Providers = () => {

    const {displayError} = useContext(AlertMessageContext);

    const [searchString, setSearchString] = useState('');
    const [superficialUserDetails, setSuperficialUserDetails] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState(superficialUserDetails);

    useEffect(() => {
        getSuperficialUserDetails();
    }, [])

    useEffect(() => {
        filterUsers();
    }, [searchString, superficialUserDetails])

    const getSuperficialUserDetails = () => {
        axios.get(`http://localhost:5000/get-superficial-user-details`)
        .then(response => {
            setSuperficialUserDetails(response.data)
        })
        .catch(error => {
            displayError(error);
        })
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterUsers = () => {
        setFilteredUsers(
            superficialUserDetails.filter(
                user => {
                    const fullUserName = user.firstName.concat(' ', user.lastName);
                    return fullUserName.toLocaleLowerCase().includes(searchString);
                }
            )
        )
    }

    return(
        <PageContainer>
            <SearchBar className="providers-search-bar" onSearchChange={onSearchChange} placeholder={"Providers"}/>
            <ProvidersList users={filteredUsers}/>
        </PageContainer>
    )
}

export default Providers