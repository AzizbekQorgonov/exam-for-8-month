import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function SuccessPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-10">
      <div className="rounded-lg border border-[#E4E7E9] bg-white px-6 py-10 text-center">
        <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <FiCheckCircle size={28} />
        </div>
        <h1 className="mt-0 text-3xl font-semibold text-[#191C1F]">Order placed successfully</h1>
        <p className="mb-4 text-gray-500">
          Thanks for shopping with Clicon. Your order is being processed.
        </p>
        <Link
          className="inline-flex items-center gap-2 rounded bg-[#FA8232] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E06620]"
          to="/"
        >
          Continue Shopping <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
