import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useStore } from "../store/StoreContext";

export default function CartPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 && subtotal < 300 ? 20 : 0;
  const total = subtotal + shipping;

  if (!state.cart.length) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-10">
        <div className="rounded-lg border border-[#E4E7E9] bg-white px-6 py-10 text-center">
          <h1 className="mt-0 text-3xl font-bold text-[#191C1F]">Your cart is empty</h1>
          <p className="mb-4 text-gray-500">Add products to your cart and continue shopping.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded bg-[#FA8232] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
          >
            Continue Shopping <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-8 pb-10 lg:grid-cols-[1fr_330px]">
      <section>
        <h1 className="mb-4 mt-0 text-[32px] font-semibold leading-[40px] text-[#191C1F]">
          Shopping Cart
        </h1>
        {state.cart.map((item) => (
          <article
            className="mb-3 grid grid-cols-1 items-center gap-4 border border-[#E4E7E9] bg-white p-4 sm:grid-cols-[100px_1fr_auto_auto]"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[180px] w-full bg-white object-contain sm:h-[100px] sm:w-[100px]"
            />
            <div>
              <h2 className="m-0 text-base font-semibold text-[#191C1F]">{item.name}</h2>
              <p className="my-1 text-sm text-gray-500">SKU: {item.sku}</p>
              <strong className="text-[#2DA5F3]">${item.price}</strong>
            </div>

            <div className="inline-flex items-center rounded-full border border-[#E4E7E9]">
              <button
                className="inline-flex h-9 w-9 items-center justify-center border-0 bg-transparent text-lg transition-colors hover:text-[#FA8232]"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QTY",
                    payload: { id: item.id, qty: item.qty - 1 }
                  })
                }
              >
                <FiMinus size={14} />
              </button>
              <span className="min-w-8 text-center text-sm font-bold">{item.qty}</span>
              <button
                className="inline-flex h-9 w-9 items-center justify-center border-0 bg-transparent text-lg transition-colors hover:text-[#FA8232]"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QTY",
                    payload: { id: item.id, qty: item.qty + 1 }
                  })
                }
              >
                <FiPlus size={14} />
              </button>
            </div>

            <button
              className="inline-flex items-center gap-2 rounded border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
              onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
            >
              <FiTrash2 size={14} />
              Remove
            </button>
          </article>
        ))}
      </section>

      <aside className="h-fit border border-[#E4E7E9] bg-white p-4 lg:sticky lg:top-4">
        <h2 className="mt-0 text-2xl font-semibold text-[#191C1F]">Order Summary</h2>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span>Shipping</span>
          <strong>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</strong>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-bold">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-[#FA8232] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
          onClick={() => navigate("/checkout")}
        >
          Proceed To Checkout <FiArrowRight size={14} />
        </button>
      </aside>
    </div>
  );
}
