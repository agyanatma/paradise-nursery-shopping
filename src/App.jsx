import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

const LandingPage = () => {
  return (
    <main className="landing-page">
      <section className="hero-panel">
        <p className="eyebrow">Welcome to Paradise Nursery</p>
        <h1>Bring home lush, calming greenery.</h1>
        <p>
          Explore curated indoor plants, simple care guidance, and a shopping
          flow built for first-time and seasoned plant owners alike.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="cta-button">
            Get Started
          </Link>
          <Link to="/about" className="secondary-link">
            Learn About Us
          </Link>
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
