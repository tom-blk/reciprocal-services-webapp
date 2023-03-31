import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import Banner from "../../components/banner/banner.component";
import Footer from "../../components/footer/footer.component";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";

import "./nav.styles.scss"

const Nav = () => {
    return(
        <MaxSizeContainer>
            <div className="banner-container">
                <Banner type={'header'}/>
            </div>
                <div className="navbar-container">
                    <Link to='/'>Home</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/providers'>Providers</Link>
                    <Link to='/outgoing-orders'>Outgoing Orders</Link>
                    <Link to='/incoming-orders'>Incoming Orders</Link>
                    <Link to='/userProfile'>Your Profile</Link>
                    <Link to='/login'>Login</Link>
                </div>
               <Outlet/> 
               <Footer/>
        </MaxSizeContainer>
        
    )
}

export default Nav