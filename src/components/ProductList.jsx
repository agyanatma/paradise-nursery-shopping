import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, selectCartCount } from "../features/cart/CartSlice";

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
      {
        id: "snake-plant",
        name: "Snake Plant",
        price: 24,
        accent: "#5f8f61",
        description: "A resilient upright plant known for filtering indoor air.",
      },
      {
        id: "peace-lily",
        name: "Peace Lily",
        price: 28,
        accent: "#7cae7a",
        description: "Glossy foliage with elegant blooms for calmer interiors.",
      },
      {
        id: "areca-palm",
        name: "Areca Palm",
        price: 34,
        accent: "#6f9f5b",
        description: "A soft, feathery palm that brightens living rooms and studios.",
      },
      {
        id: "spider-plant",
        name: "Spider Plant",
        price: 19,
        accent: "#86b36e",
        description: "Fast-growing greenery that is forgiving for first-time owners.",
      },
      {
        id: "boston-fern",
        name: "Boston Fern",
        price: 27,
        accent: "#4f8a55",
        description: "A lush fern with arching fronds for fresher-looking spaces.",
      },
      {
        id: "rubber-plant",
        name: "Rubber Plant",
        price: 31,
        accent: "#567a45",
        description: "Deep green leaves and a bold silhouette for modern rooms.",
      },
    ],
  },
  {
    category: "Low Maintenance",
    plants: [
      {
        id: "zz-plant",
        name: "ZZ Plant",
        price: 29,
        accent: "#6c915f",
        description: "Low-effort care and glossy leaves for busy schedules.",
      },
      {
        id: "pothos",
        name: "Golden Pothos",
        price: 18,
        accent: "#8cac50",
        description: "Trailing vines that adapt well to shelves, desks, and corners.",
      },
      {
        id: "jade-plant",
        name: "Jade Plant",
        price: 22,
        accent: "#6ea85d",
        description: "A compact succulent with thick leaves and easy upkeep.",
      },
      {
        id: "aloe-vera",
        name: "Aloe Vera",
        price: 17,
        accent: "#76b66d",
        description: "A sun-loving succulent that works well on bright windowsills.",
      },
      {
        id: "cast-iron",
        name: "Cast Iron Plant",
        price: 26,
        accent: "#547f4d",
        description: "Hardy foliage built to handle lower light and irregular watering.",
      },
      {
        id: "parlor-palm",
        name: "Parlor Palm",
        price: 25,
        accent: "#8fa85d",
        description: "A classic indoor palm with a relaxed and tidy shape.",
      },
    ],
  },
  {
    category: "Statement Plants",
    plants: [
      {
        id: "monstera",
        name: "Monstera Deliciosa",
        price: 39,
        accent: "#4e9057",
        description: "Iconic split leaves that make any room feel more tropical.",
      },
      {
        id: "fiddle-leaf",
        name: "Fiddle Leaf Fig",
        price: 45,
        accent: "#537b46",
        description: "Tall sculptural growth for bright and open indoor spaces.",
      },
      {
        id: "bird-of-paradise",
        name: "Bird of Paradise",
        price: 49,
        accent: "#729b47",
        description: "Large dramatic foliage for a bold living room focal point.",
      },
      {
        id: "calathea",
        name: "Calathea Orbifolia",
        price: 33,
        accent: "#669d70",
        description: "Striped leaves with a soft pattern that stands out on display.",
      },
      {
        id: "anthurium",
        name: "Anthurium",
        price: 30,
        accent: "#8ea35b",
        description: "Glossy leaves and color accents for shelves and tabletops.",
      },
      {
        id: "philodendron",
        name: "Philodendron Xanadu",
        price: 36,
        accent: "#608f4f",
        description: "Dense layered greenery with a strong, architectural look.",
      },
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
        <Link to="/about">About</Link>
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
  const [addedToCart, setAddedToCart] = useState({});
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
              {group.plants.map((plant) => (
                <article key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-thumb" />
                  <h3>{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <p className="price">${plant.price.toFixed(2)}</p>
                  <button
                    type="button"
                    disabled={addedToCart[plant.name]}
                    onClick={() => {
                      dispatch(addItem(plant));
                      setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
                    }}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export { Navbar };
export default ProductList;
