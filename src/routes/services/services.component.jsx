import SearchBar from "../../components/search-bar/search-bar.component"
import { services } from "../../datamodels/services/services-examples"
import { useEffect, useState } from "react"
import ServiceList from "../../components/services-list/service-list.component"

const Services = () => {

    const [searchString, setSearchString] = useState('');
    const [fetchedServices, setFetchedServices] = useState(services);

    const [filteredServices, setFilteredServices] = useState(fetchedServices);

    useEffect(() => {
        filterServices();
    }, [searchString])

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterServices = () => {
        setFilteredServices(
            fetchedServices.filter(
                service => {return service.name.toLocaleLowerCase().includes(searchString)}
            )
        )
    }

    return(
        <div className="services-container">
            <SearchBar className="services-search-bar" onSearchChange={onSearchChange}/>
            <ServiceList services={filteredServices}/>
        </div>
    )
}

export default Services