import SearchBar from "../../components/search-bar/search-bar.component"
import { useEffect, useState } from "react"
import ServiceList from "../../components/services-list/service-list.component"

import "./services.styles.scss"
import PageContainer from "../../utils/page-container/page-container.component"

import axios from "axios"

const Services = () => {

    const [searchString, setSearchString] = useState('');
    const [services, setServices] = useState([]);

    const [filteredServices, setFilteredServices] = useState(services);

    const a = axios;

    useEffect(() => {
        getServices();
    }, [])

    useEffect(() => {
        filterServices();
    }, [searchString, services])

    const getServices = () => {
        a.get(`http://localhost:5000/get-all-services`)
        .then(response => {
            setServices(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterServices = () => {
        setFilteredServices(
            services.filter(
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