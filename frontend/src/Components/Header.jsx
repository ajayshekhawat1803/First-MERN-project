import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header-Footer.css'
import logo from '../assets/shopifylogo.png'


const Header = () => {
    const auth = localStorage.getItem("userdata");
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <header>
            <div id="logo">
                <img src={logo} alt="LOGO" />
            </div>
            {
                auth ?
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add-product">Add Product</Link></li>
                        <li><Link to="/update/">Update Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/login">Logout <span id='username'>({JSON.parse(auth).name})</span></Link></li>
                    </ul>
                    :
                    < ul className='nav-right'>
                        <li><Link to="/signup">Sign UP</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>


            }
        </header >
    )
}

export default Header
