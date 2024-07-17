import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useProfile from '../hooks/useProfile';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const profile = useProfile(`"${localStorage.getItem("token")}"`); // Using useProfile hook with token
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchOrderHistory = async () => {
            if (!profile) return; // Exit if profile is not yet loaded
            setIsLoading(true); // Set loading state
            try {
                const response = await axios.get(`http://localhost:8081/api/v1/orderhistory/getByUsername/${profile.username}`);
                const orders = parseOrderData(response.data.orderData);
                setOrderHistory(orders);
            } catch (error) {
                console.error('Failed to fetch order history:', error);
                setOrderHistory([]);
            } finally {
                setIsLoading(false); // Clear loading state
            }
        };

        fetchOrderHistory();
    }, [profile]); // Trigger useEffect when profile changes

    // Function to parse orderData correctly
    const parseOrderData = (orderData) => {
        try {
            // Clean up the orderData string
            const cleanedData = orderData.replace(/\n/g, '').replace(/\]\[/g, ','); // Remove newlines and join arrays
            const parsedData = JSON.parse(cleanedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing orderData:', error);
            return [];
        }
    };

    return (
        <>
            <div className={`order-history-container py-5 ${orderHistory.length === 0 ? 'order-history-empty' : ''}`}>
                <Container className="order-history-content">
                    <h2 className="text-center mb-5">Order History</h2>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : orderHistory.length > 0 ? (
                        <div className="order-section mb-5">
                            <Row>
                                {orderHistory.map((order, index) => (
                                    <Col md={4} sm={6} key={index} className="mb-4">
                                        <Card className="h-100">
                                            <Card.Img
                                                variant="top"
                                                src={order.image}
                                                alt={order.title}
                                                className="product-image"
                                            />
                                            <Card.Body>
                                                <Card.Title className="product-title">{order.title}</Card.Title>
                                                <Card.Text className="product-category text-muted">{order.category}</Card.Text>
                                                <Card.Text className="product-price">&#8377;{Math.round(order.price) * 84}</Card.Text>
                                                <Link to={`/product/${order.id}`} className="btn btn-dark btn-block">
                                                    View Product
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ) : (
                        <div className="order-history-empty">
                            <p>No orders found.</p>
                        </div>
                    )}
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;
