import SearchBar from "../../components/search-bar/search-bar.component"
import { useContext, useEffect, useState } from "react"
import ServiceList from "../../components/services-list/service-list.component"

import "./services.styles.scss"
import PageContainer from "../../utils/page-container/page-container.component"

import axios from "axios"
import { AppContext } from "../../context/app-context"

const Services = () => {

    const appContext = useContext(AppContext);

    const [searchString, setSearchString] = useState('');
    const [superficialServiceDetails, setSuperficialServiceDetails] = useState([]);
    const [filteredServices, setFilteredServices] = useState(superficialServiceDetails);

    useEffect(() => {
        getSuperficialServiceDetails();
    }, [])

    useEffect(() => {
        filterServices();
    }, [searchString, superficialServiceDetails])

    const getSuperficialServiceDetails = () => {
        axios.get(`http://localhost:5000/get-superficial-service-details`)
        .then(response => {
            setSuperficialServiceDetails(response.data)
            console.log(response.data)
        })
        .catch(error => {
            appContext.displayErrorMessage(error)
        })
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterServices = () => {
        setFilteredServices(
            superficialServiceDetails.filter(
                service => {return service.name.toLocaleLowerCase().includes(searchString)}
            )
        )
    }

    return(
        <PageContainer>
            <SearchBar className="services-search-bar" onSearchChange={onSearchChange} placeholder={"Services"}/>
            <ServiceList services={filteredServices}/>
        </PageContainer>
    )
}

export default Services