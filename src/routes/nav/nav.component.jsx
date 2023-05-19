import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import Banner from "../../components/banner/banner.component";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";

import "./nav.styles.scss"
import CreditCounter from "../../components/credit-counter/credit-counter.component";
import { Fragment, useContext } from "react";
import { UserContext } from "../../context/user.context";
import LogIn from "../login/login.component";
import { ModalContext } from "../../context/modal.context";
import ConfirmOrCancelModal from "../../components/modal/confirm-or-cancel-modal.component";

const Nav = () => {

    const { user, setUser } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);
 
    const toggleLogOutModal = () => {

        const confirmLogOut = () => {
            document.cookie = "prometheusUserAuthenticationToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setUser(null);
        }

        toggleModal(<ConfirmOrCancelModal prompt={'Do you really want to log out?'} onConfirm={confirmLogOut}/>)
    }

    return(
        <Fragment>
        {
            user
            ?
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
                    <div onClick={e => toggleLogOutModal()}>Log Out</div>
                </div>
                <Outlet/> 
                <CreditCounter/>
            </MaxSizeContainer>
            :
            <LogIn/>
        }  
        </Fragment>
    )
}

export default Nav