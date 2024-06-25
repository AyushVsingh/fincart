import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './OrderHistory.css'; // Import the CSS file for additional styling

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        try {
            const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
            setOrderHistory(Array.isArray(orders) ? orders : []);
        } catch (error) {
            console.error('Failed to parse order history:', error);
            setOrderHistory([]);
        }
    }, []);

    return (
        <>
            <div className={`order-history-container py-5 ${orderHistory.length === 0 ? 'order-history-empty' : ''}`}>
                <Container className="order-history-content">
                    <h2 className="text-center mb-5">Order History</h2>
                    {orderHistory.length > 0 ? (
                        orderHistory.map((order, index) => (
                            <div key={index} className="order-section mb-5">
                                {/* <h4 className="text-muted mb-4">Order #{index + 1}</h4> */}
                                <Row>
                                    {order.map((product, idx) => (
                                        <Col md={4} sm={6} key={idx} className="mb-4">
                                            <Card className="h-100">
                                                <Card.Img
                                                    variant="top"
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="product-image"
                                                />
                                                <Card.Body>
                                                    <Card.Title className="product-title">{product.title}</Card.Title>
                                                    <Card.Text className="product-category text-muted">{product.category}</Card.Text>
                                                    <Card.Text className="product-price">&#8377;{Math.round(product.price) * 84}</Card.Text>
                                                    <Link to={`/products/${product.id}`} className="btn btn-dark btn-block">
                                                        View Product
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))
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
