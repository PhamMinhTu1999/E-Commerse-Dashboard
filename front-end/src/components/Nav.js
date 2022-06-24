import React from "react";
import {Link, useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem("user");
    const navigate = useNavigate
    const logout = ()=>{
        localStorage.clear();
        navigate('/');
    }
    return (
        <div className="navbar">
            <a href="/">
                <img alt="logo" className="logo" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1647490619965/P1dsNgj-f1.png"/>
            </a>
            <ul className="nav-ul">
                { auth ? <>
                    <li><Link to="products">Products</Link></li>
                </> : <></>}
            </ul>
            <ul className="nav-ul nav-right">
                { auth ? <>
                    <li><Link to="/profile">Profile: {JSON.parse(auth).name}</Link></li>
                    <li><Link to="/" onClick={logout}>Logout</Link></li>
                </> : <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </>}
            </ul>
        </div>
    )
}

export default Nav;