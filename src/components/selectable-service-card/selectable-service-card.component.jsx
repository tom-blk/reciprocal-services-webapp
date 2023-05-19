import React, { useEffect, useState } from 'react'

import './selectable-service-card.styles.scss';

const SelectableServiceCard = ({service, onClickHandler, changeEmbersPerHour}) => {

    const [isSelected, setIsSelected] = useState(service.isSelected);

    useEffect(() => {
    }, [])

    return (
        <div 
            className={`selectable-service-card ${service.isSelected && 'selectable-service-card-active'}`}
            onClick={e => {onClickHandler(service); setIsSelected(!isSelected)}}
        >
            {service.name}
            {service.isSelected &&
                <div className='selectable-service-card-embers-per-hour-container'>
                    <input type='text' className='number-input' value={service.embersPerHour} onChange={e => {changeEmbersPerHour(service.id, e.target.value)}} onClick={e => e.stopPropagation()} style={{width: '25px', textAlign:'right'}}/>
                    <span>Embers/Hour</span>
                </div>
            }
        </div>
    )
}

export default SelectableServiceCard
