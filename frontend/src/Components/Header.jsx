import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header-Footer.css'


const Header = () => {
    const auth = localStorage.getItem("userdata");
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/signup")
    }
    return (
        <header>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {
                    auth ? <Link onClick={logout} to="/signup">Logout</Link>
                        : <>
                            <li><Link to="/signup">Sign UP</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                }
            </ul>
        </header>
    )
}

export default Header
