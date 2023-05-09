import SearchBar from "../../components/search-bar/search-bar.component"
import { useContext, useEffect, useState } from "react"
import ServicesList from "../../components/services-list/services-list.component"

import "./services.styles.scss"
import PageContainer from "../../utils/page-container/page-container.component"

import { AlertMessageContext } from "../../context/alert-message.context"
import { getSuperficialServiceDetails } from "../../api/services/get-all-services"
import AddButtonComponent from "../../components/add-button-component/add-button.component"
import { ModalContext } from "../../context/modal.context"
import AddServiceModal from "../../components/modal/add-service-modal.component"
 
const Services = () => {

    const { displayError } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);

    const [searchString, setSearchString] = useState('');
    const [superficialServiceDetails, setSuperficialServiceDetails] = useState([]);
    const [filteredServices, setFilteredServices] = useState(superficialServiceDetails);

    useEffect(() => {
        getSuperficialServiceDetails(displayError).then(response => setSuperficialServiceDetails(response));
    }, [])

    useEffect(() => {
        filterServices();
    }, [searchString, superficialServiceDetails])

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

    const onAddButtonClick = () => {
        toggleModal(
            <AddServiceModal/>
        )
    }

    return(
        <PageContainer>
            <div className="services-search-and-add-service-container">
                <SearchBar className="services-search-bar" onSearchChange={onSearchChange} placeholder={"Services"}/>
                <AddButtonComponent onClickHandler={onAddButtonClick}>+</AddButtonComponent>
            </div>
            <ServicesList services={filteredServices}/>
        </PageContainer>
    )
}

export default Services