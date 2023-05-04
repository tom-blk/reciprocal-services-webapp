import './round-image-container.styles.scss';

import { ReactComponent as ServiceIcon } from '../../assets/vectors/service.svg';
import { ReactComponent as AvatarIcon } from '../../assets/vectors/avatar.svg';

const RoundImageContainer = ({picture, serviceOrUser, size, className}) => {

    const renderPicture = () => {
        if(!picture){
            if(serviceOrUser === 'user'){
                return(
                    <div className={size}>
                        <AvatarIcon fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
                    </div>
                ) 
            } else if(serviceOrUser === 'service'){
                return(
                    <div className={size}>
                        <ServiceIcon fill={getComputedStyle(document.body).getPropertyValue('--color-primary-accent')}/>
                    </div>
                ) 
            }
        } else {
            return <img src={picture} className={size}></img>;
        }
    }

    return(
        <div className='round-image-container'>
            {
                renderPicture()
            }
        </div>
    )
}

export default RoundImageContainer