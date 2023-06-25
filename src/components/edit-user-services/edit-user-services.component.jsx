import React, { useContext, useEffect, useState } from 'react'

import { AlertMessageContext } from '../../context/alert-message.context';
import { UserContext } from '../../context/user.context';

import PageContainer from '../../utils/page-container/page-container.component';
import ButtonComponent from '../buttons/button.component';
import SearchBar from '../search-bar/search-bar.component';
import SelectableService from './selectable-service/selectable-service.component';

import { useNavigate } from 'react-router';

import { updateUserSpecificServices } from '../../api/users/update';
import { getServiceList } from '../../api/services/read';
import { getUserSpecificServices } from '../../api/users/read';

import './edit-user-services.styles.scss';

const EditUserServicesList = () => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [searchString, setSearchString] = useState('')
    const [filteredServices, setFilteredServices] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        getUserSpecificServices(user.id)
            .then(response => setUserServices(response))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        getServiceList()
            .then(response => setServices(markUserServicesAndSort(response, userServices)))
            .catch(error => displayError(error))
    }, [userServices])

    useEffect(() => {
        filterServices()
    }, [searchString, services])

    useEffect(() => {
        console.log(services)
    }, [services])

    useEffect(() => {
        console.log(userServices)
    }, [userServices])

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

    const markUserServicesAndSort = (allServices, userServices) => {
        
        // Decide wether service is selected or not and set add embersPerHourChanged attribute to each service (is only needed in front-end)
        allServices.forEach(service => {
            const index = userServices.findIndex(userService => userService.id === service.id)

            if(userServices[index]?.id === service.id){
                service.isSelected = true;
                service.embersPerHour = userServices[index].creditsPerHour
            } else {
                service.isSelected = false;
            }
            service.embersPerHourChanged = false;
        });

        // Sort  by selection status and alphabetically
        allServices.sort((a,b) => (b.isSelected - a.isSelected || a.name.localeCompare(b.name)));

        return allServices;
    };

    const onServiceCardClick = (clickedService) => {
        const tempServices = services;

        let index = tempServices.findIndex(service => (service.id === clickedService.id));

        tempServices[index].isSelected = !tempServices[index].isSelected;

        setServices([...tempServices]);
    };

    const confirmEmbersPerHour = (serviceId, numberOfEmbers) => {
        const tempServices = services;

        const index = tempServices.findIndex(service => service.id === serviceId);

        tempServices[index].embersPerHourChanged = true;
        tempServices[index].embersPerHour = numberOfEmbers;

        setServices([...tempServices]);
    };

    const confirmButtonOnClickHandler = () => {
        const changedServices = [];
        services.forEach(service => {if(service.isSelected) changedServices.push(service)});

        updateUserSpecificServices(user.id, userServices, changedServices)
            .then(displaySuccessMessage('Services Successfully Updated!'))
            .catch(error => displayError(error));
    };

    const cancelButtonOnClickHandler = () => navigate(`/userProfile-edit`);

    return (
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
                                <SelectableService key={service.id} onClickHandler={onServiceCardClick} updateEmbersPerHour={confirmEmbersPerHour} service={service} serviceName={service.name}/>
                            )
                        }
                    )
                }
            </div>
            <ButtonComponent buttonType={'confirm'} onClickHandler={confirmButtonOnClickHandler}>Save Changes</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
        </PageContainer>
    )
}

export default EditUserServicesList
