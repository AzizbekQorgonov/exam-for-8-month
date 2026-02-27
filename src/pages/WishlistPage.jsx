import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { useStore } from "../store/StoreContext";

export default function WishlistPage() {
  const { state } = useStore();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="inline-flex items-center gap-2 text-[32px] font-semibold leading-[40px] text-[#191C1F]">
          <FiHeart size={28} className="text-[#FA8232]" />
          Wishlist
        </h1>
      </div>

      {!state.wishlist.length ? (
        <div className="rounded-lg border border-[#E4E7E9] bg-white px-6 py-10 text-center">
          <h2 className="mt-0 text-2xl font-semibold text-[#191C1F]">Your wishlist is empty</h2>
          <p className="mb-4 text-gray-500">Save products here and buy them later.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded bg-[#FA8232] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
          >
            Browse Products <FiArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {state.wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
