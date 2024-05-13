import styles from "./Header.module.scss"
import logo from "../../assets/images/logo.png"
// import {NavLink, useNavigate} from "react-router-dom";
// import {useContext, useEffect, useState} from "react";
// import {useUser} from "../../hooks/useUser.jsx";
// import {checkAuth} from "../../apis/apiUsers.jsx";
// import { UserAuth } from "../../appContext.js";
// import Cookies from "js-cookie";

function Header() {

    // const { appAuth, setAppAuth } = useContext(UserAuth)
    // const navigate = useNavigate();

    // function logout(){
    //     setAppAuth({authenticated:false, user: {}})
    //     Cookies.remove('token')
    //
    //     navigate('/login');
    // }

    return (
        <header className={`${styles.header} d-flex flex-row align-items-center`}>

            <div className={`d-flex flex-fill flex-fill ${styles.logoContainer} align-items-center`}>
                {/*<NavLink to={'/'} >*/}
                    <img src={logo} alt="logo cookchef"/>
                {/*</ NavLink>*/}
            </div>
            {/*<ul className={styles.headerList}>*/}
            {/*    /!*{!appAuth.authenticated &&*!/*/}
            {/*        <NavLink to={'/login'}>*/}
            {/*            <button className="btn btn-reverse-primary mr-5">*/}
            {/*                <i className="fas fa-plug mr-5"></i>*/}
            {/*                <span>Log in</span>*/}
            {/*            </button>*/}
            {/*        </NavLink>*/}
            {/*    /!*}*!/*/}
            {/*    /!*{appAuth?.authenticated &&*!/*/}
            {/*    /!*    <button className="btn btn-primary" onClick={logout}>*!/*/}
            {/*    /!*        <i className="fas fa-sign-in-alt mr-5"></i>*!/*/}
            {/*    /!*        <span>Log out</span>*!/*/}
            {/*    /!*    </button>*!/*/}
            {/*    /!*}*!/*/}
            {/*    /!*{(appAuth?.authenticated && appAuth?.user.admin)  &&*!/*/}
            {/*        <NavLink to={'/admin'}>*/}
            {/*            <button className="btn btn-reverse-primary mr-5">*/}
            {/*                <i className="fas fa-plug mr-5"></i>*/}
            {/*                <span>Admin panel</span>*/}
            {/*            </button>*/}
            {/*        </NavLink>*/}
            {/*    /!*}*!/*/}

            {/*</ul>*/}
        </header>
    )
}

export default Header;