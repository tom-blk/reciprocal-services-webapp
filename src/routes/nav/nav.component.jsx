import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";

import "./nav.styles.scss"

const Nav = () => {
    return(
        <div className="top-level-container">
            <div className="banner-container">
                <div className="banner">Prometheus</div>
            </div>
            <div className="navbar-constrainer">
                <div className="navbar-container">
                    <Link to='/'>Home</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/providers'>Providers</Link>
                    <Link to='/outgoing-orders'>Outgoing Orders</Link>
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