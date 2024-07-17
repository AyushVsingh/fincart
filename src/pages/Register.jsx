import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/api/v1/users/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, username, email, password, userRole })
            });
            setTimeout(() => {
                toast.success("Registration successful!");
            }, 1000)

            setTimeout(
                function () {
                    navigate("/login");
                },
                2000
            );
        }
        catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error("Login error:", error);
        }
    }
    return (
        <>
            {/* <Navbar /> */}
            <ToastContainer />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div class="form my-3">
                                <label htmlFor="firstName">Firstname</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="Enter Your First Name"
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label htmlFor="lastName">Lastname</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="Enter your Last Name"
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter Username"
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label for="userRole">UserRole</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="userRole"
                                    value={userRole}
                                    onChange={(e) => setUserRole(e.target.value)}
                                    placeholder="userRole"
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register