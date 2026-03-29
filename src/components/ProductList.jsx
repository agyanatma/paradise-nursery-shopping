import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, selectCartCount } from "../features/cart/CartSlice";

const createThumb = (label, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
      <rect width="240" height="180" rx="24" fill="#f7f0e6" />
      <circle cx="180" cy="50" r="30" fill="${accent}" opacity="0.2" />
      <path d="M120 40c24 12 36 32 36 60 0 18-5 34-16 48H100c-11-14-16-30-16-48 0-28 12-48 36-60Z" fill="${accent}" />
      <path d="M120 54c-10 14-15 30-15 48 0 15 4 31 12 46M120 54c10 14 15 30 15 48 0 15-4 31-12 46" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" />
      <rect x="90" y="136" width="60" height="18" rx="8" fill="#8c5a3c" />
      <text x="120" y="170" text-anchor="middle" font-family="Verdana, sans-serif" font-size="14" fill="#3d352b">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const plantCatalog = [
  {
    category: "Air Purifiers",
    plants: [
      { id: "snake-plant", name: "Snake Plant", price: 24, accent: "#5f8f61" },
      { id: "peace-lily", name: "Peace Lily", price: 28, accent: "#7cae7a" },
      { id: "areca-palm", name: "Areca Palm", price: 34, accent: "#6f9f5b" },
      { id: "spider-plant", name: "Spider Plant", price: 19, accent: "#86b36e" },
      { id: "boston-fern", name: "Boston Fern", price: 27, accent: "#4f8a55" },
      { id: "rubber-plant", name: "Rubber Plant", price: 31, accent: "#567a45" },
    ],
  },
  {
    category: "Low Maintenance",
    plants: [
      { id: "zz-plant", name: "ZZ Plant", price: 29, accent: "#6c915f" },
      { id: "pothos", name: "Golden Pothos", price: 18, accent: "#8cac50" },
      { id: "jade-plant", name: "Jade Plant", price: 22, accent: "#6ea85d" },
      { id: "aloe-vera", name: "Aloe Vera", price: 17, accent: "#76b66d" },
      { id: "cast-iron", name: "Cast Iron Plant", price: 26, accent: "#547f4d" },
      { id: "parlor-palm", name: "Parlor Palm", price: 25, accent: "#8fa85d" },
    ],
  },
  {
    category: "Statement Plants",
    plants: [
      { id: "monstera", name: "Monstera Deliciosa", price: 39, accent: "#4e9057" },
      { id: "fiddle-leaf", name: "Fiddle Leaf Fig", price: 45, accent: "#537b46" },
      { id: "bird-of-paradise", name: "Bird of Paradise", price: 49, accent: "#729b47" },
      { id: "calathea", name: "Calathea Orbifolia", price: 33, accent: "#669d70" },
      { id: "anthurium", name: "Anthurium", price: 30, accent: "#8ea35b" },
      { id: "philodendron", name: "Philodendron Xanadu", price: 36, accent: "#608f4f" },
    ],
  },
].map((group) => ({
  ...group,
  plants: group.plants.map((plant) => ({
    ...plant,
    image: createThumb(plant.name, plant.accent),
  })),
}));

const Navbar = () => {
  const itemCount = useSelector(selectCartCount);

  return (
    <header className="navbar">
      <Link to="/" className="brand-mark">
        Paradise Nursery
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart" className="cart-link">
          Cart
          <span className="cart-badge">{itemCount}</span>
        </Link>
      </nav>
    </header>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className="page-shell">
      <Navbar />
      <main className="catalog-page">
        <section className="catalog-intro">
          <p className="eyebrow">Plant Collection</p>
          <h1>Browse easy-care plants by category.</h1>
          <p>
            Add any plant to the cart, then adjust quantities later from the
            cart page.
          </p>
        </section>

        {plantCatalog.map((group) => (
          <section key={group.category} className="plant-category">
            <div className="section-heading">
              <h2>{group.category}</h2>
              <p>{group.plants.length} plants available</p>
            </div>
            <div className="plant-grid">
              {group.plants.map((plant) => {
                const isInCart = Boolean(cartItems[plant.id]);

                return (
                  <article key={plant.id} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-thumb" />
                    <h3>{plant.name}</h3>
                    <p className="price">${plant.price.toFixed(2)}</p>
                    <button
                      type="button"
                      disabled={isInCart}
                      onClick={() => dispatch(addToCart(plant))}
                    >
                      {isInCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export { Navbar };
export default ProductList;
