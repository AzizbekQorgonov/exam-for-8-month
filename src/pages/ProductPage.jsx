import { Link, useParams } from "react-router-dom";
import { FiArrowRight, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useStore } from "../store/StoreContext";

export default function ProductPage() {
  const { slug } = useParams();
  const { dispatch } = useStore();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-10">
        <div className="rounded-lg border border-[#E4E7E9] bg-white px-6 py-10 text-center">
          <h1 className="mt-0 text-3xl font-semibold text-[#191C1F]">Product not found</h1>
          <Link
            className="inline-flex items-center gap-2 rounded bg-[#FA8232] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
            to="/"
          >
            Go Home <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-10">
      <section className="mb-5 grid grid-cols-1 gap-5 border border-[#E4E7E9] bg-white p-4 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="border border-[#E4E7E9] bg-white p-4">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-contain"
          />
        </div>

        <div>
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.05em] text-[#2DA5F3]">
            {product.category}
          </p>
          <h1 className="my-2 text-[32px] font-semibold leading-[40px] text-[#191C1F]">{product.name}</h1>
          <p className="my-2 text-gray-500">{product.description}</p>
          <div className="my-3 flex items-baseline gap-3">
            <strong className="text-[1.65rem] text-[#2DA5F3]">${product.price}</strong>
            <span className="text-[#ADB7BC] line-through">${product.oldPrice}</span>
          </div>
          <p className="my-2 text-gray-500">
            Rating: {product.rating}/5 | SKU: {product.sku} | Stock: {product.stock}
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded bg-[#FA8232] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
            >
              <FiShoppingCart size={15} />
              Add To Cart
            </button>
            <button
              className="inline-flex items-center gap-2 rounded border border-[#FFE7D6] bg-orange-50 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-orange-700 transition hover:bg-orange-100"
              onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}
            >
              <FiHeart size={15} />
              Add To Wishlist
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="m-0 text-2xl font-semibold text-[#191C1F]">Related Products</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
