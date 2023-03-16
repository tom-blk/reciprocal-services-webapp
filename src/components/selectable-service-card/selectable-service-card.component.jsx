import React, { useState } from 'react'

import './selectable-service-card.styles.scss';

const SelectableServiceCard = ({service, onClickHandler}) => {

    const [isSelected, setIsSelected] = useState(service.isSelected) 

    return (
        <div 
            className={`selectable-service-card ${service.isSelected ? 'selectable-service-card-active' : ''}`}
            onClick={e => {onClickHandler(service); setIsSelected(!isSelected)}}
        >
            {service.name}
        </div>
    )
}

export default SelectableServiceCard
