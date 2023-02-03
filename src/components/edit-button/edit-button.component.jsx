import { Fragment } from "react";

import './edit-button.styles.scss';

const EditButton = ({size, onClickHandler}) => {

    const backgroundImage = "https://www.svgrepo.com/download/433660/pen-o.svg"

    return(
        <Fragment>
            <div 
                onClick={e => onClickHandler()}
                style={{height: size, width: size, backgroundImage: `url(${backgroundImage})`}} 
                className="edit-button"
            />
        </Fragment>
    )
}

export default EditButton