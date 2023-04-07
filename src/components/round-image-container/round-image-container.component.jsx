import './round-image-container.styles.scss';

import { ReactComponent as ServiceIcon } from '../../assets/vectors/service.svg';
import { ReactComponent as AvatarIcon } from '../../assets/vectors/avatar.svg';

const RoundImageContainer = ({picture, serviceOrUser, size, className}) => {

    const renderPicture = () => {
        if(!picture){
            if(serviceOrUser === 'user'){
                return <AvatarIcon
                    width={assertSize()}
                    height={assertSize()}
                    fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}
                />;
            } else if(serviceOrUser === 'service'){
                return <ServiceIcon
                    width={assertSize()}
                    height={assertSize()}
                    fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}
                />;
            }
        } else {
            return picture;
        }
    }

    const assertSize = () => {
        if(size==="card"){
            return getComputedStyle(document.body).getPropertyValue('--profile-avatar-size-card')
        } else if(size==="page"){
            return getComputedStyle(document.body).getPropertyValue('--profile-avatar-size-page') 
        }
    }

    return(
        renderPicture()
    )
}

export default RoundImageContainer