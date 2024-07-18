import React, { useContext, useEffect, useState } from "react"
import { MaybeUserSpecificService } from '../../types/services'

import { ModalContext } from "../../context/modal.context"

import SearchBar from "../../components/search-bar/search-bar.component"
import AddServiceModal from "../../components/modals/addService/add-service-modal.component"
import ServicesList from "../../components/card-lists/services-list/services-list.component"
import PageContainer from "../../utils/page-container/page-container.component"
import Distancer from "../../utils/distancer/distancer.component"
import ButtonComponent from "../../components/buttons/button.component"

import { getServiceList } from "../../api/services/read"

import "./services.styles.scss"
import { toast } from "react-toastify"
import AlertMessageComponent from "../../components/alerts/alert-message.component"
import { errorMessageOptions } from "../../components/alerts/alertMessageTypes"
import { UserContext } from "../../context/user.context"

const Services = () => {

    const { toggleModal } = useContext(ModalContext);
    const { fetchUser } = useContext(UserContext);

    const [searchString, setSearchString] = useState('');
    const [superficialServiceDetails, setSuperficialServiceDetails] = useState<MaybeUserSpecificService[]>([]);
    const [filteredServices, setFilteredServices] = useState(superficialServiceDetails);

    useEffect(() => {
        getServiceList()
            .then(response => setSuperficialServiceDetails(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [])

    useEffect(() => {
        const filterServices = () => {
            setFilteredServices(
                superficialServiceDetails.filter(
                    service => {return service.name.toLocaleLowerCase().includes(searchString)}
                )
            )
        }
        
        filterServices();
    }, [searchString, superficialServiceDetails])

    const onSearchChange = (userInput: string) => {
        setSearchString(userInput)
    }

    const onServiceCreated = () => {
        getServiceList()
            .then(response => setSuperficialServiceDetails(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        fetchUser()
    }

    const onAddButtonClick = () => {
        toggleModal(
            <AddServiceModal onServiceCreatedCallback={onServiceCreated}/>
        )
    }

    return(
        <PageContainer>
            <div className="services-search-and-add-service-container">
                <SearchBar className="services-search-bar" onSearchChange={onSearchChange} placeholder={"Services"}/>
                <ButtonComponent buttonType={"secondary-confirm secondary-confirm-hover"} additionalStyles={{height: "40px", display: 'grid', alignContent: 'center'}} onClickHandler={onAddButtonClick}>+</ButtonComponent>
            </div>
            <Distancer size={1}/>
            <ServicesList services={filteredServices}/>
        </PageContainer>
    )
}

export default Services
