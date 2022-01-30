import React from 'react'
import { InputForm, Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import SearchBar from './SearchBar'

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink to="/" className="nav-logo">
                        Brandweb
                    </NavLink>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <SearchBar placeholder="Look up a game" />
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar