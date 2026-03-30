import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

const LandingPage = () => {
  const [showProductList, setShowProductList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showProductList) {
      navigate("/products");
    }
  }, [showProductList, navigate]);

  return (
    <main className="landing-page background-image">
      <section className="hero-panel">
        <div className="hero-brand">
          <h1>Welcome to Paradise Nursery</h1>
          <p className="hero-lead">
            Paradise Nursery is a boutique indoor plant shop built around easy
            browsing, thoughtful plant curation, and a simple shopping flow for
            new and experienced plant owners.
          </p>
          <div className="hero-actions">
            <button
              className="cta-button"
              onClick={() => setShowProductList(true)}
            >
              Get Started
            </button>
            <Link to="/about" className="secondary-link">
              Learn About Us
            </Link>
          </div>
        </div>
        <div className="hero-details" aria-label="Company overview">
          <p className="eyebrow">Why Shop Here</p>
          <ul className="hero-points">
            <li>Air-purifying, low-maintenance, and statement plants.</li>
            <li>Clear pricing, quick add-to-cart actions, and live cart totals.</li>
            <li>A focused storefront designed around the Paradise Nursery brand.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
};

export default App;
