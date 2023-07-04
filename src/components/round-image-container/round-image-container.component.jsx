import './round-image-container.styles.scss';

import { ReactComponent as ServiceIcon } from '../../assets/vectors/service.svg';
import { ReactComponent as AvatarIcon } from '../../assets/vectors/avatar.svg';

const RoundImageContainer = ({picture, serviceOrUser, size}) => {

    const renderPicture = () => {
        if(!picture){
            if(serviceOrUser === 'user'){
                return <AvatarIcon fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
            } else if(serviceOrUser === 'service'){
                return <ServiceIcon fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
            }
        } else {
            return <img src={picture} className={size}></img>;
        }
    }

    return(
        <div className={`round-image-container ${size}`}>
            { renderPicture() }
        </div>
    )
}

export default RoundImageContainer