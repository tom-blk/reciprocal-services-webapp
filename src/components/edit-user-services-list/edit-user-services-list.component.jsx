import React, { useContext, useEffect, useState } from 'react'

import { AlertMessageContext } from '../../context/alert-message.context';
import { UserContext } from '../../context/user.context';

import MaxSizeContainer from '../../utils/max-size-container/max-size-container.component';
import PageContainer from '../../utils/page-container/page-container.component';
import ButtonComponent from '../button/button.component';
import SearchBar from '../search-bar/search-bar.component';
import SelectableServiceCard from '../selectable-service-card/selectable-service-card.component';

import { useNavigate } from 'react-router';

import { updateUserSpecificServices } from '../../api/users/update';
import { getServiceList } from '../../api/services/read';
import { getUserSpecificServices } from '../../api/users/read';

import './edit-user-services-list.styles.scss';

const EditUserServicesList = () => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [allServicesWithoutUserServices, setAllServicesWithoutUserServices] = useState([]);
    const [userServiceIds, setUserServiceIds] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]); //Keeps track of what was selected so it can be sent to the backend without causing optical changes in the lists due to mapping
    const [searchString, setSearchString] = useState('')
    const [filteredServices, setFilteredServices] = useState([]);


    useEffect(() => {
        getUserSpecificServices(user.id)
            .then(response => {
                console.log(response);
                setUserServiceIds(extractIdsIntoNewArray(response)) 
                setSelectedServiceIds(extractIdsIntoNewArray(response))
            })
            .catch(error => displayError(error))
    }, [])


    useEffect(() => {
        getServiceList()
            .then(response => setAllServicesWithoutUserServices(assignSelectionStatusAndReturnServices(response, userServiceIds)))
            .catch(error => displayError(error))
    }, [userServiceIds])


    useEffect(() => {
        filterServices()
    }, [searchString, allServicesWithoutUserServices])
    

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }


    const filterServices = () => {
        setFilteredServices(
            allServicesWithoutUserServices.filter(
                service => {return service.name.toLocaleLowerCase().includes(searchString)}
            )
        )
    }


    const sortServicesBySelectionStatus = (services) => {
        return(services.sort((a, b) => {
            if(a.isSelected && !b.isSelected) return -1;
            if(!a.isSelected && !b.isSelected) return 1;
            return 0;
        }))
    }


    const extractIdsIntoNewArray = (services) => {
        const serviceIds = []

        services.forEach((service) => {
            serviceIds.push(service.id)
        })

        return serviceIds;
    }


    const assignSelectionStatusAndReturnServices = (allServices, selectedServiceIds) => {
        const compareServiceId = (service, selectedServiceId) => {
            return service.id === selectedServiceId
        }
        
        allServices.forEach(service => {
            if(selectedServiceIds.some(selectedServiceId => compareServiceId(service, selectedServiceId))){
                service.isSelected = true;
            } else {
                service.isSelected = false;
            }
        })

        sortServicesBySelectionStatus(allServices);
        
        console.log(allServices);
        return allServices;
    }


    const onServiceCardClick = (clickedService) => {
        let tempServices = allServicesWithoutUserServices;

        const findServiceIndex = (services, clickedService) => {
            return(services.findIndex(service => (service.id === clickedService.id)))
        }

        let serviceIndex = findServiceIndex(tempServices, clickedService);
        
        const modifySelectedServiceIdsConditionally = () => {
            if(selectedServiceIds.includes(clickedService.id))
                return selectedServiceIds.filter(serviceId => (serviceId !== tempServices[serviceIndex].id));
            if(!selectedServiceIds.includes(clickedService.id))
                return selectedServiceIds.concat(clickedService.id);
        }

        setSelectedServiceIds(modifySelectedServiceIdsConditionally);

        tempServices[serviceIndex].isSelected = !tempServices[serviceIndex].isSelected;

        setAllServicesWithoutUserServices(tempServices);
    }

    const changeServiceEmbersPerHour = ( serviceId, numberOfEmbers ) => {
        console.log(serviceId);
        console.log(numberOfEmbers);
    }

    const confirmButtonOnClickHandler = () => {
        updateUserSpecificServices(user.id, userServiceIds, selectedServiceIds, displayError)
            .then(displaySuccessMessage('Services Successfully Updated!'))
            .catch(error => displayError(error))
    }

    const cancelButtonOnClickHandler = () => navigate(`/userProfile-edit`)

    return (
        <MaxSizeContainer>
            <PageContainer>
                <SearchBar 
                    placeholder={'Services'}
                    onSearchChange={onSearchChange}
                />
                <div className='selectable-services-list'>
                    {
                        filteredServices
                        &&
                        filteredServices.map(service => {
                            return(
                                    <SelectableServiceCard key={service.id} onClickHandler={onServiceCardClick} changeEmbersPerHour={changeServiceEmbersPerHour} service={service} serviceName={service.name}/>
                                )
                            }
                        )
                    }
                </div>
                <ButtonComponent buttonType={'confirm'} onClickHandler={confirmButtonOnClickHandler}>Save Changes</ButtonComponent>
                <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
            </PageContainer>
        </MaxSizeContainer>
    )
}

export default EditUserServicesList
