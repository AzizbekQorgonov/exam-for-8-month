import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiCreditCard,
  FiGrid,
  FiHeart,
  FiHome,
  FiPhoneCall,
  FiSearch,
  FiShoppingCart
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from "react-icons/fa";

import logo from "../assets/Logo.png";
import { useStore } from "../store/StoreContext";

const containerClass = "mx-auto w-full max-w-7xl px-4";

const topSocials = [
  { id: "facebook", Icon: FaFacebookF },
  { id: "twitter", Icon: FaTwitter },
  { id: "instagram", Icon: FaInstagram },
  { id: "pinterest", Icon: FaPinterestP }
];

function TopLink({ to, label, external }) {
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 transition-colors hover:text-white">
        {label}
      </a>
    );
  }
  return (
    <NavLink to={to} className="text-xs text-gray-300 transition-colors hover:text-white">
      {label}
    </NavLink>
  );
}

function MainNavLink({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex min-h-10 items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${isActive ? "text-[#FA8232]" : "text-[#475156] hover:text-[#FA8232]"
        }`
      }
    >
      <Icon size={16} />
      <span>{label}</span>
    </NavLink>
  );
}

function ActionIconButton({ label, count, onClick, Icon }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 hover:text-[#FA8232]"
      title={label}
      aria-label={label}
    >
      <Icon size={22} />
      <span className="absolute -right-1 -top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-semibold leading-none text-[#1B6392]">
        {count}
      </span>
    </button>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { state } = useStore();

  const cartCount = useMemo(
    () => state.cart.reduce((total, item) => total + item.qty, 0),
    [state.cart]
  );
  const wishlistCount = state.wishlist.length;

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = query.trim();
    if (!text) return;
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-30">
        <div className="hidden border-b border-white/15 bg-[#1B6392] md:block">
          <div className={`${containerClass} flex items-center justify-between py-2`}>
            <p className="text-[13px] text-white/90">Welcome to Clicon online eCommerce store.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/80">Follow us:</span>
                {topSocials.map(({ id, Icon }) => (
                  <button
                    key={id}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
                    aria-label={id}
                  >
                    <Icon size={12} />
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-white/25" />
              <button className="inline-flex items-center gap-1 text-xs text-white/90 transition-colors hover:text-white">
                Eng <FiChevronDown size={12} />
              </button>
              <button className="inline-flex items-center gap-1 text-xs text-white/90 transition-colors hover:text-white">
                USD <FiChevronDown size={12} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#1B6392]">
          <div
            className={`${containerClass} grid grid-cols-1 items-center gap-3 py-4 md:grid-cols-[200px_1fr_auto] md:gap-5`}
          >
            <button className="w-fit rounded px-1 py-1" onClick={() => navigate("/")}>
              <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
            </button>

            <form
              className="flex min-h-[48px] items-center overflow-hidden rounded-sm bg-white"
              onSubmit={handleSubmit}
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for anything..."
                className="h-12 flex-1 px-4 text-sm text-[#191C1F] outline-none"
                aria-label="Search"
              />
              <button
                type="submit"
                className="inline-flex h-12 min-w-12 items-center justify-center px-4 text-[#191C1F] transition-colors hover:text-[#FA8232]"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
            </form>

            <div className="flex items-center justify-end gap-1">
              <ActionIconButton
                label="Wishlist"
                count={wishlistCount}
                onClick={() => navigate("/wishlist")}
                Icon={FiHeart}
              />
              <ActionIconButton
                label="Cart"
                count={cartCount}
                onClick={() => navigate("/cart")}
                Icon={FiShoppingCart}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-[#E4E7E9] bg-white">
          <div
            className={`${containerClass} flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between`}
          >
            <div className="flex items-center gap-5 overflow-x-auto">
              <button className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap border border-[#E4E7E9] bg-[#F2F4F5] px-3 text-sm font-semibold text-[#191C1F]">
                All Category
                <FiChevronDown size={14} />
              </button>
              <MainNavLink to="/" label="Track Order" Icon={FiShoppingCart} />
              <MainNavLink to="/search?q=all" label="Compare" Icon={FiGrid} />
              <MainNavLink to="/wishlist" label="Customer Support" Icon={FiPhoneCall} />
            </div>
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#191C1F]">
              <FiPhoneCall size={16} className="text-[#2DA5F3]" />
              Need Help: +1-202-555-0104
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto bg-[#191C1F]">
        <div className={`${containerClass} py-10`}>
          <div className="grid gap-8 text-gray-300 md:grid-cols-4">
            {/* Customer Support */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">CLICON</h4>
              <p className="text-sm font-semibold text-white mb-2">Customer Support:</p>
              <p className="text-sm text-gray-400">(629) 555-0129</p>
              <p className="text-sm text-gray-400 mt-3">4517 Washington Ave. Manchester, Kentucky 39495</p>
              <p className="text-sm text-gray-400 mt-2">info@kinbo.com</p>
            </div>

            {/* Top Category */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
                Top Category
              </h4>
              <div className="flex flex-col gap-2">
                <TopLink to="/search?q=computer" label="Computer & Laptop" />
                <TopLink to="/search?q=smartphone" label="SmartPhone" />
                <TopLink to="/search?q=headphone" label="Headphone" />
                <TopLink to="/search?q=accessories" label="Accessories" />
                <TopLink to="/search?q=camera" label="Camera & Photo" />
                <TopLink to="/search?q=tv" label="TV & Homes" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                <TopLink to="/search?q=all" label="Shop Product" />
                <TopLink to="/cart" label="Shopping Cart" />
                <TopLink to="/wishlist" label="Wishlist" />
                <TopLink to="/search?q=all" label="Compare" />
                <TopLink to="/search?q=all" label="Track Order" />
                <TopLink to="/search?q=all" label="Customer Help" />
                <TopLink to="/" label="About Us" />
              </div>
            </div>

            {/* Popular Tag */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
                Popular Tag
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Game", "iPhone", "TV", "Asus Laptops", "Macbook", "SSD", "Graphics Card", "Power Bank", "Smart TV", "Speaker", "Tablet", "Microwave", "Samsung"].map((tag) => (
                  <span key={tag} className="cursor-pointer rounded border border-gray-600 px-2 py-1 text-xs text-gray-400 transition-colors hover:border-orange-500 hover:text-orange-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-10 border-t border-gray-700 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">Subscribe to our newsletter</h4>
                <p className="text-sm text-gray-400 mt-1">Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.</p>
              </div>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="h-12 min-w-[250px] rounded px-4 text-sm text-[#191C1F] outline-none"
                />
                <button className="h-12 rounded bg-orange-500 px-6 font-semibold text-white transition-colors hover:bg-orange-600">
                  SUBSCRIBE →
                </button>
              </form>
            </div>
          </div>

          {/* Download App */}
          <div className="mt-8 border-t border-gray-700 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">CLICON</h4>
                <p className="text-sm text-gray-400 mt-1">Customer Support: (629) 555-0129</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-700">
                    <span className="text-white text-xs">GP</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Get it now</p>
                    <p className="text-sm font-semibold text-white">Google Play</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-700">
                    <span className="text-white text-xs">AS</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Get it now</p>
                    <p className="text-sm font-semibold text-white">App Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">Kinbo eCommerce Template © 2021. Design by Templatecookie</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
