import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import "./Product.css";  // Import your CSS file

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const response2 = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );
        const data2 = await response2.json();
        setSimilarProducts(data2);

      } catch (error) {
        console.warn(error);
      }
      setLoading(false);
      setLoading2(false);
    };
    fetchProduct();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={20} width={250} />
          <Skeleton height={70} />
          <Skeleton height={30} width={70} />
          <Skeleton height={40} width={110} />
          <Skeleton height={100} />
          <Skeleton height={30} width={110} inline={true} />
          <Skeleton className="mx-3" height={30} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 col-sm-12 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead" style={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.5' }}>
            {product.description}
          </p>
          <h3 className="display-6 my-4">&#8377;{Math.round(product.price) * 84}</h3>
          <button className="btn btn-outline-dark" onClick={() => addProduct(product)}>
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        <div className="mx-4">
          <Skeleton height={200} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={200} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={200} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={200} width={250} />
        </div>
      </div>
    </div>
  );

  const ShowSimilarProducts = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.image}
              alt={item.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
            </div>
            <div className="card-body">
              <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="col-12">
            <h2 className="text-center">You may also like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProducts />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
