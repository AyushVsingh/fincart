import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = `"${localStorage.getItem('token')}"`;
        fetch('http://localhost:8081/api/v1/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    return (
        <>
            <div className=" py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className="shadow-lg bg-light text-dark">
                                <Card.Body>
                                    <Card.Title className="text-center bg-dark mb-4 text-light">User Profile</Card.Title>
                                    {userData ? (
                                        <div>
                                            <p className="mb-2 justify-content"><FontAwesomeIcon icon={faUser} className="me-2" /><strong>ID:</strong> {userData.id}</p>
                                            <br />
                                            <p className="mb-2 justify-content"><FontAwesomeIcon icon={faUser} className="me-2" /><strong>First Name:</strong> {userData.firstName}</p>
                                            <br />
                                            <p className="mb-2 justify-content"><FontAwesomeIcon icon={faUser} className="me-2" /><strong>Last Name:</strong> {userData.lastName}</p>
                                            <br />
                                            <p className="mb-2 justify-content"><FontAwesomeIcon icon={faEnvelope} className="me-2" /><strong>Email:</strong> {userData.email}</p>
                                        </div>
                                    ) : (
                                        <p className="text-center">Loading...</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer className="mt-5" />
        </>
    );
};

export default Profile;
