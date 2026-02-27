import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useStore } from "../store/StoreContext";

const inputClass =
  "w-full border border-[#E4E7E9] px-3 py-3 text-sm text-[#191C1F] outline-none focus:border-[#FA8232] focus:ring-1 focus:ring-orange-100";

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 && subtotal < 300 ? 20 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (!state.cart.length) return;
    dispatch({ type: "CLEAR_CART" });
    navigate("/success");
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-8 pb-10 lg:grid-cols-[1fr_330px]">
      <section className="border border-[#E4E7E9] bg-white p-4">
        <h1 className="mb-4 mt-0 text-[32px] font-semibold leading-[40px] text-[#191C1F]">
          Checkout
        </h1>
        <form className="grid gap-3" onSubmit={handlePlaceOrder}>
          <input className={inputClass} type="text" placeholder="Full Name" required />
          <input className={inputClass} type="email" placeholder="Email Address" required />
          <input className={inputClass} type="text" placeholder="Phone Number" required />
          <input className={inputClass} type="text" placeholder="Street Address" required />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input className={inputClass} type="text" placeholder="City" required />
            <input className={inputClass} type="text" placeholder="ZIP Code" required />
          </div>
          <select className={inputClass} required defaultValue="">
            <option value="" disabled>
              Payment Method
            </option>
            <option value="card">Credit Card</option>
            <option value="cash">Cash On Delivery</option>
            <option value="paypal">PayPal</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded bg-[#FA8232] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
          >
            <FiLock size={14} />
            Place Order
          </button>
        </form>
      </section>

      <aside className="h-fit border border-[#E4E7E9] bg-white p-4 lg:sticky lg:top-4">
        <h2 className="mt-0 text-2xl font-semibold text-[#191C1F]">Your Order</h2>
        {!state.cart.length && <p className="text-gray-500">Your cart is currently empty.</p>}
        {state.cart.map((item) => (
          <div key={item.id} className="mb-3 flex items-baseline justify-between gap-4">
            <span>
              {item.name} x {item.qty}
            </span>
            <strong>${(item.price * item.qty).toFixed(2)}</strong>
          </div>
        ))}
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span>Shipping</span>
          <strong>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</strong>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#E4E7E9] pt-4 text-lg font-bold">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  );
}
