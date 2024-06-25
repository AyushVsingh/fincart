import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBox, faInfoCircle, faEnvelope, faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import logo from './Image/logo.PNG';

const Navbar = ({ products }) => {
    const [profile, setProfile] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const state = useSelector(state => state.handleCart);
    const token = `"${localStorage.getItem("token")}"`;
    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/v1/users/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.status === 403) {
                console.error("Forbidden: You do not have the necessary permissions to access this resource.");
            } else if (!response.ok) {
                console.error("HTTP error: ", response.status);
            }

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

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


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <div className="btn-group me-3">
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
                    <NavLink className="navbar-brand fw-bold fs-4 text-light" style={{ marginLeft: '30px' }} to="/">
                        <img src={logo} alt="Logo" style={{ width: 70, height: 40 }} />
                    </NavLink>
                </div>

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
                                {/* <Link className="dropdown-item" to="/order-history">Order History</Link> */}
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
    );
}

export default Navbar;