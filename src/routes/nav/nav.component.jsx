import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import BackgroundImage from "../../assets/images/lavender_natural.jpg";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";

import "./nav.styles.scss"

const Nav = () => {
    return(
        <div>
            <div style={{backgroundImage: `url(${BackgroundImage})`}} className="navbar-image">
            <div className="navbar-container">
                <Link to='/'>Home</Link>
                <Link to='/services'>Services</Link>
                <Link to='/providers'>Providers</Link>
                <Link to='/transactions'>Transactions</Link>
                <Link to='/incoming-orders'>Incoming Orders</Link>
                <Link to='/userProfile'>Your Profile</Link>
                <Link to='/login'>Login</Link>
            </div>
            </div>
            <MaxSizeContainer>
               <Outlet/> 
            </MaxSizeContainer>
        </div>
        
    )
}

export default Nav