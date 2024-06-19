import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Navbar from '../src/components/Navbar';

import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound, Profile } from "./pages"

const products = [
  { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops men' },
  { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts' },
  { id: 3, title: 'Mens Cotton Jacket' },
  { id: 4, title: 'Mens Casual Slim Fit' },
  { id: 5, title: 'John Hardy Women jewelery' },
  { id: 6, title: 'Solid Gold Petite Micropave jewelery' },
  { id: 7, title: 'White Gold Plated Princess jewelery' },
  { id: 8, title: 'Pierced Owl Rose Gold Plated Stainless Steel Double jewelery' },
  { id: 9, title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0 Electronics' },
  { id: 10, title: 'SanDisk SSD PLUS 1TB Electronics' },
  { id: 11, title: 'Silicon Power 256GB SSD Electronics' },
  { id: 12, title: 'WD 4TB Gaming Drive Works with Playstation 4 HDD Electronics' },
  { id: 13, title: 'Acer SB220Q bi 21.5 inches Full HD Electronics' },
  { id: 14, title: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor Electronics' },
  { id: 15, title: 'BIYLACLESEN Women Snowboard Jacket Winter Coats' },
  { id: 16, title: 'Lock and Love Women Removable Hooded Faux Leather Moto Biker Jacket' },
  { id: 17, title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats' },
  { id: 18, title: 'MBJ Women Solid Short Sleeve Boat Neck V' },
  { id: 19, title: 'Opna Women Short Sleeve Moisture' },
  { id: 20, title: 'DANVOUY Womens T Shirt Casual Cotton Short' },

  // Add more products as needed
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <Provider store={store}>
      <Navbar products={products} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);