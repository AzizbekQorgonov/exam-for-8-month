import { Link } from "react-router-dom";
import { FiEye, FiHeart, FiShoppingCart } from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";

import { useStore } from "../store/StoreContext";

function Stars({ value }) {
  const rating = Math.round(value);
  return (
    <div className="mb-1 flex items-center gap-1 text-sm text-orange-400">
      {Array.from({ length: 5 }).map((_, index) =>
        index < rating ? <IoStar key={index} size={13} /> : <IoStarOutline key={index} size={13} />
      )}
    </div>
  );
}

function IconButton({ active = false, onClick, children, label }) {
  return (
    <button
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
        active
          ? "bg-[#FA8232] text-white"
          : "bg-white text-[#191C1F] hover:-translate-y-0.5 hover:bg-[#FA8232] hover:text-white"
      }`}
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export default function ProductCard({ product }) {
  const { state, dispatch } = useStore();
  const inWishlist = state.wishlist.some((item) => item.id === product.id);
  const inCart = state.cart.some((item) => item.id === product.id);
  const basePrice = Number(product.price || 0);
  const hasOldPrice = product.oldPrice !== undefined && product.oldPrice !== null;
  const oldPrice = hasOldPrice ? Number(product.oldPrice) : basePrice;
  const discountPercentage = Number(product.discountPercentage || 10);
  const discounted = hasOldPrice
    ? basePrice.toFixed(2)
    : (basePrice - (basePrice * discountPercentage) / 100).toFixed(2);
  const productName = product.name || product.title || "Product";
  const productHref = product.slug
    ? `/product/${product.slug}`
    : `/search?q=${encodeURIComponent(productName)}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[#E4E7E9] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,24,39,0.07)]">
      <div className="flex h-[160px] items-center justify-center bg-white px-3 pt-4">
        <Link to={productHref} className="h-full w-full">
          <img
            src={product.image}
            alt={productName}
            className="h-full w-full object-contain mix-blend-multiply"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-[80px] left-2 right-2 top-2 flex items-center justify-center gap-2 bg-gray-300/30 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <IconButton
          active={inWishlist}
          onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}
          label="Wishlist"
        >
          <FiHeart size={14} />
        </IconButton>
        <IconButton onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })} label="Add to cart">
          <FiShoppingCart size={14} className={inCart ? "text-[#FA8232]" : ""} />
        </IconButton>
        <Link
          to={productHref}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#191C1F] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FA8232] hover:text-white"
          title="Open product"
          aria-label="Open product"
        >
          <FiEye size={14} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-end px-2 py-2">
        <Stars value={product.rating} />
        <Link to={productHref} className="line-clamp-1 text-sm font-medium text-[#191C1F]">
          {productName}
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-[#ADB7BC] line-through">${oldPrice.toFixed(2)}</span>
          <span className="text-sm font-semibold text-[#2DA5F3]">${discounted}</span>
        </div>
      </div>
    </article>
  );
}
