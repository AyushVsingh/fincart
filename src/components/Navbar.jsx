import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBox, faInfoCircle, faEnvelope, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import logo from './Image/trendcart1.PNG';
import useProfile from '../hooks/useProfile';

const Navbar = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const state = useSelector(state => state.handleCart);
    const token = `"${localStorage.getItem("token")}"`;
    const navigate = useNavigate();
    const profile = useProfile(token);

    const [isSidenavOpen, setIsSidenavOpen] = useState(false);

    const Logout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    }

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const results = products.filter((product) =>
                product.title.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelect = (product) => {
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/product/${product.id}`);
    };

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
                <div className="container-fluid">
                    <button className="btn btn-outline-light me-3" onClick={toggleSidenav}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <NavLink className="navbar-brand fw-bold fs-4 text-light" to="/">
                        <img src={logo} alt="Logo" style={{ width: 80, height: 40, borderRadius: '5px', marginLeft: '20px' }} />
                    </NavLink>

                    <div className="collapse navbar-collapse">
                        <form className="d-flex ms-auto search-container position-relative" style={{ flexGrow: 1, justifyContent: 'center', maxWidth: '400px', marginRight: '200px' }}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {searchResults.length > 0 && (
                                <ul className="list-group suggestion-list">
                                    {searchResults.slice(0, 5).map((product) => (
                                        <li
                                            key={product.id}
                                            className="list-group-item"
                                            onClick={() => handleSelect(product)}
                                        >
                                            {product.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    </div>

                    <div className="d-flex align-items-center" style={{ marginRight: '20px' }}>
                        {profile ? (
                            <div className="btn-group" style={{ marginRight: '20px' }}>
                                <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser} /> {profile.username}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <NavLink to="/profile" className="dropdown-item"><i className="fa fa-sign-in-alt"></i> Profile</NavLink>
                                    <NavLink to="/order-history" className="dropdown-item"><i className="fa fa-sign-in-alt"></i> Order History</NavLink>
                                    <button onClick={Logout} className="dropdown-item"><i className="fa fa-sign-in-alt"></i> Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div className="btn-group" style={{ marginRight: '20px' }}>
                                <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser} /> Account
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <NavLink to="/login" className="dropdown-item"><i className="fa fa-sign-in-alt"></i> Login</NavLink>
                                    <NavLink to="/register" className="dropdown-item"><i className="fa fa-user-plus"></i> Register</NavLink>
                                </div>
                            </div>
                        )}
                        <NavLink to="/cart" className="btn btn-outline-light ms-3">
                            <FontAwesomeIcon icon={faShoppingCart} /> Cart ({state.length})
                        </NavLink>
                    </div>
                </div>
            </nav>

            <div className={`sidenav bg-dark ${isSidenavOpen ? 'open' : ''}`}>
                <div className="hello-container">
                    {profile ? (
                        <div className="hello">
                            <FontAwesomeIcon icon={faUser} className="me-2" /> Hello, {profile.username}
                        </div>
                    ) : (
                        <NavLink className="hello" to="/login">
                            <FontAwesomeIcon icon={faUser} className="me-2" /> Hello, Sign in
                        </NavLink>
                    )}
                    <button className="closebtn" onClick={toggleSidenav}>&times;</button>
                </div>
                <hr />
                <NavLink className="sidenav-item" to="/">
                    <FontAwesomeIcon icon={faHome} className="me-2" /> Home
                </NavLink>
                <NavLink className="sidenav-item" to="/product">
                    <FontAwesomeIcon icon={faBox} className="me-2" /> Products
                </NavLink>
                <NavLink className="sidenav-item" to="/about">
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> About
                </NavLink>
                <NavLink className="sidenav-item" to="/contact">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Contact
                </NavLink>
            </div>
        </>
    );
}

export default Navbar;
