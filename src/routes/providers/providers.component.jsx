import SearchBar from "../../components/search-bar/search-bar.component"
import { members } from "../../datamodels/members/members-examples"
import { useEffect, useState } from "react"
import ProvidersList from "../../components/providers-list/providers-list.component"

import "./providers.styles.scss";
import PageContainer from "../../utils/page-container/page-container.component";

import axios from "axios";

const Providers = () => {

    const [searchString, setSearchString] = useState('');
    const [superficialUserDetails, setSuperficialUserDetails] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState(superficialUserDetails);

    const a = axios;

    useEffect(() => {
        getSuperficialUserDetails();
    }, [])

    useEffect(() => {
        filterUsers();
    }, [searchString, superficialUserDetails])

    const getSuperficialUserDetails = () => {
        a.get(`http://localhost:5000/get-superficial-user-details`)
        .then(response => {
            setSuperficialUserDetails(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
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