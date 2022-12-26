import SearchBar from "../../components/search-bar/search-bar.component"
import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../../components/service-card/service-card.component"
import { useEffect, useState } from "react"
import AllServices from "../../components/all-services/all-services.component"

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
            <SearchBar className="services-searchbar" onSearchChange={onSearchChange}/>
            <AllServices services={filteredServices}/>
        </div>
    )
}

export default Services