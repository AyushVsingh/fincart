import React, { useState, useEffect } from "react";
import { Footer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/action";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import useProfile from "../hooks/useProfile";

const EmptyCart = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12 py-5 bg-light text-center">
        <h4 className="p-3 display-5">No item in Cart</h4>
        <Link to="/" className="btn btn-outline-dark mx-4">
          <i className="fa fa-arrow-left"></i> Continue Shopping
        </Link>
      </div>
    </div>
  </div>
);

const ShowCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "India",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.handleCart);
  const token = `"${localStorage.getItem("token")}"`;
  const profile = useProfile(token);
  console.log(state);

  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;

  state.forEach((item) => {
    subtotal += item.price * item.qty * 84;
    totalItems += item.qty;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/api/v1/orders/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Order placed!");
        setTimeout(() => {
          toast.info("Confirmation mail sent!");
        }, 1000);
      } else {
        toast.error("Failed to place order. Please try again.");
        return;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Order placement error:", error);
      return;
    } finally {
      setLoading(false);
    }
    try {
      // API call to save order history
      const orderData = state.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        rating: item.rating,
        ratingCount: item.ratingCount,
        qty: item.qty
      }));

      const orderPayload = {
        username: profile.username,
        orderData: orderData
      };

      const orderHistoryResponse = await fetch("http://localhost:8081/api/v1/orderhistory/saveOrUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderHistoryResponse.ok) {
        throw new Error("Failed to save order history.");
      }

      // Clear local storage after successful backend save
      localStorage.removeItem('orderHistory');

      // Clear Redux cart
      dispatch(clearCart());
      setTimeout(() => {
        toast.success("Checkout successful! Your cart has been emptied.");
      }, 1000);

    } catch (error) {
      toast.error("An error occurred during checkout. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }

  };


  return (
    <>
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})
                    <span>&#8377;{Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>&#8377;{shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>&#8377;{Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                        First name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Last name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Email*
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="1234 Main St"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        placeholder="Apartment or suite"
                      />
                    </div>

                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">
                        Country*
                      </label>
                      <br />
                      <select
                        className="form-select"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option>India</option>
                      </select>
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">
                        State*
                      </label>
                      <br />
                      <select
                        className="form-select"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chhattisgarh</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Madhya Pradesh</option>
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Odisha</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>West Bengal</option>
                      </select>
                      <div className="invalid-feedback">Please provide a valid state.</div>
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">
                        Zip*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder=""
                        required
                      />
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="my-3">
                      <div className="form-check">
                        <input
                          id="credit"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          checked
                          required
                        />
                        <label className="form-check-label" htmlFor="credit">
                          Credit card
                        </label>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6 my-1">
                        <label htmlFor="ccName" className="form-label">
                          Name on card*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccName"
                          name="ccName"
                          value={formData.ccName}
                          onChange={handleInputChange}
                          placeholder=""
                          required
                        />
                        <small className="text-muted">Full name as displayed on card</small>
                      </div>

                      <div className="col-md-6 my-1">
                        <label htmlFor="ccNumber" className="form-label">
                          Credit card number*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccNumber"
                          name="ccNumber"
                          value={formData.ccNumber}
                          onChange={handleInputChange}
                          placeholder=""
                          required
                        />
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="ccExpiration" className="form-label">
                          Expiration*
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="ccExpiration"
                          name="ccExpiration"
                          value={formData.ccExpiration}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="ccCvv" className="form-label">
                          CVV*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccCvv"
                          name="ccCvv"
                          value={formData.ccCvv}
                          onChange={handleInputChange}
                          placeholder=""
                          required
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button onClick={handleSubmit} disabled={loading} className="w-25 btn btn-primary" type="submit">
                      {loading ? <ClipLoader size={20} color={"#ffffff"} /> : 'Continue to Checkout'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  return (
    <>
      <ToastContainer />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length === 0 ? <EmptyCart /> : <ShowCheckout />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
