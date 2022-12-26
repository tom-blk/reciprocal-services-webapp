import { Outlet } from "react-router"
import { Link } from "react-router-dom"

const Nav = () => {
    return(
        <div>
            <Link to='/'>Home</Link>
            <Link to='/services'>Services</Link>
            <Link to='/providers'>Providers</Link>
            <Link to='/recentAssociates'>Recent</Link>
            <Link to='/userProfile'>Profile</Link>
            <Link to='/login'>Login</Link>
            <Outlet/>
        </div>
    )
}

export default Nav