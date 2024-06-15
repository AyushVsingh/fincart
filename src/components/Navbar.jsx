import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBox, faInfoCircle, faEnvelope, faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
            <div className="container">
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className="dropdown-menu">
                        <NavLink className="dropdown-item" to="/">
                            <FontAwesomeIcon icon={faHome} className="me-2" /> Home
                        </NavLink>
                        <NavLink className="dropdown-item" to="/product">
                            <FontAwesomeIcon icon={faBox} className="me-2" /> Products
                        </NavLink>
                        <NavLink className="dropdown-item" to="/about">
                            <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> About
                        </NavLink>
                        <NavLink className="dropdown-item" to="/contact">
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Contact
                        </NavLink>
                    </div>
                </div>

                <NavLink className="navbar-brand fw-bold fs-4 px-2 text-light" to="/">
                    <img src={"./assets/logo.PNG"} alt="Logo" style={{ width: 70, height: 40, marginLeft: 10 }} />
                </NavLink>

                <form className="d-flex mx-auto" style={{ flexGrow: 1, justifyContent: 'center', maxWidth: '400px' }}>
                    <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>

                <div className="buttons text-center d-flex align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faUser} /> Account
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <NavLink to="/login" className="dropdown-item"><i className="fa fa-sign-in-alt"></i> Login</NavLink>
                            <NavLink to="/register" className="dropdown-item"><i className="fa fa-user-plus"></i> Register</NavLink>
                        </div>
                    </div>
                    <NavLink to="/cart" className="btn btn-outline-light" style={{ marginLeft: '20px' }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Cart ({state.length})
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;