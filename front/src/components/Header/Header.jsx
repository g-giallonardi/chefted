import logo from "../../assets/images/logo.png"
import {LogOut} from 'lucide-react';
import {NavLink} from "react-router-dom";
import ProfileMenu from "@/components/Header/components/ProfileMenu.jsx";
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
        <header className='flex flex-row align-items-center sticky top-0 z-40  w-full px-8  backdrop-blur bg-background shadow'>
            <div className={`flex align-items-center`}>
                <NavLink to={'/'} >
                    <span className='font-extrabold text-primary text-3xl'>ChefTed</span>
                </ NavLink>
            </div>

            <div className='flex flex-row text-sm gap-2 w-full justify-end '>
                {/*<NavLink className='flex flex-row my-auto' to={'/week'}>*/}
                {/*    <span>Ma semaine</span>*/}
                {/*</NavLink>*/}
                {/*<NavLink className='flex flex-row my-auto' to={'/chat'}>*/}
                {/*    <span>Chat</span>*/}
                {/*</NavLink>*/}
                <ProfileMenu/>
            </div>

        </header>
    )
}

export default Header;