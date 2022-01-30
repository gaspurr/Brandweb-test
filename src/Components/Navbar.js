import React from 'react'
import { InputForm, Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

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
                            <Form.Label htmlFor="Searchbar" />
                            <Form.Control
                                type="text"
                                id="search-query"
                                placeholder="Look up a game"
                            />
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar