import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.trim() || "";

  const results = useMemo(() => {
    if (!query) return [];
    const text = query.toLowerCase();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text)
      );
    });
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="inline-flex items-center gap-2 text-[32px] font-semibold leading-[40px] text-[#191C1F]">
          <FiSearch size={28} className="text-[#2DA5F3]" />
          Search Results
        </h1>
      </div>
      <p className="mb-4 text-gray-500">
        {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
      </p>

      {!results.length ? (
        <div className="rounded-lg border border-[#E4E7E9] bg-white px-6 py-10 text-center">
          <h2 className="mt-0 text-2xl font-semibold text-[#191C1F]">No products found</h2>
          <p className="mb-4 text-gray-500">Try another keyword.</p>
          <Link
            className="inline-flex items-center gap-2 rounded bg-[#FA8232] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
            to="/"
          >
            Back To Home <FiArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
