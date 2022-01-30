import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink to="/" className="nav-logo">
                        Farmy
                    </NavLink>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-links">
                                Search
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar