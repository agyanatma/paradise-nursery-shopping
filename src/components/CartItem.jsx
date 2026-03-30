import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./ProductList";
import {
  removeItem,
  updateQuantity,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from "../features/cart/CartSlice";

const CartRow = ({ item }) => {
  const dispatch = useDispatch();
  const lineTotal = item.price * item.quantity;

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} className="cart-thumb" />
      <div className="cart-item-copy">
        <h2>{item.name}</h2>
        <p>Unit price: ${item.price.toFixed(2)}</p>
        <p>Total: ${lineTotal.toFixed(2)}</p>
      </div>
      <div className="cart-controls">
        <div className="quantity-controls">
          <button
            type="button"
            disabled={item.quantity === 1}
            onClick={handleDecrement}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={handleIncrement}>
            +
          </button>
        </div>
        <button
          type="button"
          className="remove-button"
          onClick={() => dispatch(removeItem(item.id))}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

const CartItem = () => {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="cart-page">
        <section className="cart-summary">
          <p className="eyebrow">Shopping Cart</p>
          <h1>Your plant collection</h1>
          <p>Total plants in cart: {itemCount}</p>
          <p>Total cart amount: ${total.toFixed(2)}</p>
        </section>

        {items.length === 0 ? (
          <section className="empty-cart">
            <p>Your cart is currently empty.</p>
            <button className="cta-button" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </section>
        ) : (
          <>
            <section className="cart-list">
              {items.map((item) => (
                <CartRow key={item.id} item={item} />
              ))}
            </section>
            <section className="cart-actions">
              <button
                type="button"
                className="cta-button"
                onClick={() => alert("Coming Soon")}
              >
                Checkout
              </button>
              <button
                type="button"
                className="secondary-link"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default CartItem;
