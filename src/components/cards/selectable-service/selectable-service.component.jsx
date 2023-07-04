import React, { useEffect, useState } from 'react'

import RoundButton from '../../buttons/round-button/round-button.component';

import './selectable-service.styles.scss';


const SelectableServiceCard = ({service, onClickHandler, updateEmbersPerHour}) => {

    const [isSelected, setIsSelected] = useState(service.isSelected);
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [embersPerHour, setEmbersPerHour] = useState(service.embersPerHour)

    const enableEditMode = (e) => {
        e.stopPropagation();
        setEditModeEnabled(true);
    }

    const applyEmbersPerHour = (e) => {
        e.stopPropagation();
        if(embersPerHour != service.embersPerHour && embersPerHour !== 0 && embersPerHour !== undefined && embersPerHour !== null)
            updateEmbersPerHour(service.id, embersPerHour);
        setEditModeEnabled(false);
    }

    const returnConditionalUserInput = () => {
        if(service.isSelected)
        if(editModeEnabled){ return(
            <input type='text' className='number-input' defaultValue={service.embersPerHour} onChange={e => {console.log(e.target.value); setEmbersPerHour(e.target.value)}} onClick={e => e.stopPropagation()} style={{width: '25px', textAlign:'right'}}/>
        )}else{ return (
            <span>{service.embersPerHour ? service.embersPerHour : 'Specify'}</span>
        )}
    }

    const returnConditionalEditOrCofirmButton = () => {
        if(service.isSelected)
        if(editModeEnabled){ return(
            <RoundButton size={'20px'} type={'confirm'} onClickHandler={applyEmbersPerHour}/>
        )}else{ return (
            <RoundButton size={'20px'} type={'edit'} onClickHandler={e => enableEditMode(e)}/>
        )}
    }

    return (
        <div 
            className={`ssc ${service.isSelected ? 'ssc-selected main-hover' : 'ssc-unselected ssc-unselected-hover'}`}
            onClick={e => {onClickHandler(service); setEditModeEnabled(false)}}
        >
            <div>{service.name}</div>
            <div className='ssc-right-container'>
                { service.isSelected && <span className={`${!service.embersPerHour && 'warning-text'}`}>{ returnConditionalUserInput() } Embers Per Hour</span>}
                { returnConditionalEditOrCofirmButton() }
            </div >
        </div>
    )
}

export default SelectableServiceCard
