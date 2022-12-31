import { Outlet } from "react-router"
import { Link } from "react-router-dom"

import "./nav.styles.scss"

const Nav = () => {
    return(
        <div>
            <div className="navbar-container">
                <Link to='/'>Home</Link>
                <Link to='/services'>Services</Link>
                <Link to='/providers'>Providers</Link>
                <Link to='/transactions'>Transactions</Link>
                <Link to='/userProfile'>Profile</Link>
                <Link to='/login'>Login</Link>
            </div>
            <Outlet/>
        </div>
        
    )
}

export default Nav