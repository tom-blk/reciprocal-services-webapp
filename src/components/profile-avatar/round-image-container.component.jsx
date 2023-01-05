import './profile-avatar.styles.scss';

const RoundImageContainer = ({picture, size, className}) => {

    const renderPicture = () => {
        if(!picture){
            return "https://www.svgrepo.com/download/316857/profile-simple.svg";
        } else {
            return picture;
        }
    }

    const assertSize = () => {
        if(size==="card"){
            return '--profile-avatar-size-card'
        } else if(size==="page"){
            return '--profile-avatar-size-page'
        }
    }

    return(
        <div 
            className={`round-image-container ${className}`} 
            style={{
                backgroundImage: `url(${renderPicture()})`,
                width: `var(${assertSize()})`,
                height: `var(${assertSize()})`
            }}
        />
    )
}

export default RoundImageContainer