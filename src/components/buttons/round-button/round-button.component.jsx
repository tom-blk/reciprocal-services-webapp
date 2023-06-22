import { Fragment } from "react";

import Edit from "../../../assets/vectors/edit.svg";
import Confirm from "../../../assets/vectors/confirm.svg";

import './round-button.styles.scss';

const RoundButton = ({size, onClickHandler, type}) => {

    const backgroundImageUrl = () => {
        switch(type){
            case 'edit':
                return Edit;
            case 'confirm':
                return Confirm;
        }
    }

    return(
        <Fragment>
            <div 
                onClick={e => onClickHandler(e)}
                style={{height: size, width: size, backgroundImage: `url(${backgroundImageUrl()})`}} 
                className="edit-button main-hover"
            />
        </Fragment>
    )
}

export default RoundButton