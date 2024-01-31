import './round-image-container.styles.scss';

import { ReactComponent as ServiceIcon } from '../../assets/vectors/service.svg';
import { ReactComponent as AvatarIcon } from '../../assets/vectors/avatar.svg';
import { useEffect, useState } from 'react';

interface Props{
    pictureIsPresent: boolean;
    serviceOrUserId: number;
    serviceOrUser: string;
    size: string;
}

const RoundImageContainer = ({pictureIsPresent, serviceOrUserId, serviceOrUser, size}: Props) => {

    const [fallback, setFallback] = useState(!pictureIsPresent);

    const renderFallback = () => {
        if(serviceOrUser === 'user'){
            return <AvatarIcon fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
        } else if(serviceOrUser === 'service'){
            return <ServiceIcon fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
        }
    }

    return(
        <div className={`round-image-container ${size}`}>
            {
                fallback
                ?
                renderFallback()
                :      
                <img 
                    src={`${process.env.REACT_APP_SERVER_LOCATION}/${serviceOrUser}-pictures/${serviceOrUser}-${serviceOrUserId}-${serviceOrUser}-picture.png?${new Date().getTime()}`} //! Query parameter is added so that the (profile) image reloads automatically on update (would not do that otherwise bc it always has the same URL)
                    onError={(error) => (setFallback(true))} 
                    className={size}
                    alt={`${serviceOrUser}`}
                />
            }
        </div>
    )
}

export default RoundImageContainer