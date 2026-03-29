import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "./ProductList";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../features/cart/CartSlice";

const CartRow = ({ item }) => {
  const dispatch = useDispatch();
  const lineTotal = item.price * item.quantity;

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
          <button type="button" onClick={() => dispatch(decreaseQuantity(item.id))}>
            -
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => dispatch(increaseQuantity(item.id))}>
            +
          </button>
        </div>
        <button
          type="button"
          className="remove-button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

const CartItem = () => {
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="cart-page">
        <section className="cart-summary">
          <p className="eyebrow">Shopping Cart</p>
          <h1>Your plant collection</h1>
          <p>Total cart amount: ${total.toFixed(2)}</p>
        </section>

        {items.length === 0 ? (
          <section className="empty-cart">
            <p>Your cart is currently empty.</p>
            <Link to="/products" className="cta-button">
              Continue Shopping
            </Link>
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
                onClick={() => setCheckoutMessage("Checkout coming soon.")}
              >
                Checkout
              </button>
              <Link to="/products" className="secondary-link">
                Continue Shopping
              </Link>
            </section>
            {checkoutMessage ? <p className="checkout-note">{checkoutMessage}</p> : null}
          </>
        )}
      </main>
    </div>
  );
};

export default CartItem;
