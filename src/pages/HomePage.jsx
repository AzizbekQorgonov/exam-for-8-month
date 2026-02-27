import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiEye,
  FiHeadphones,
  FiHeart,
  FiRefreshCw,
  FiSearch,
  FiShoppingCart,
  FiTruck,
  FiMail
} from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaVolumeUp } from "react-icons/fa";
import { MdSmartphone } from "react-icons/md";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../components/ProductCard";
import offerImage from "../assets/Offer-Sd5Du2Fu.jpg";
import budsImage from "../assets/buds-CVZ91j5d.png";
import phoneImage from "../assets/phone-Dhu9xI4r.png";
import xboxImage from "../assets/xbox-CdipNILT.png";
import xiaomiEarbuds from "../assets/XiaomiEarBuds-4xS6xGW0.png";
import { categories as fallbackCategories, products as fallbackProducts } from "../data/products";
import { useStore } from "../store/StoreContext";

const PRODUCTS_ENDPOINT = "https://dummyjson.com/products?limit=200";
const CATEGORIES_ENDPOINT = "https://dummyjson.com/products/categories";

function toCategoryName(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeCategory(item) {
  if (typeof item === "string") {
    return { slug: item, name: toCategoryName(item) };
  }

  return {
    slug: item.slug,
    name: item.name || toCategoryName(item.slug)
  };
}

function normalizeProduct(item) {
  return {
    id: `remote-${item.id}`,
    title: item.title,
    name: item.title,
    description: item.description,
    category: item.category,
    sku: item.sku || `SKU-${item.id}`,
    price: Number(item.price),
    discountPercentage: Number(item.discountPercentage || 0),
    rating: Number(item.rating || 0),
    stock: Number(item.stock || 0),
    image: item.thumbnail
  };
}

function getProductName(product) {
  return product.name || product.title || "Product";
}

function getProductHref(product) {
  return product.slug ? `/product/${product.slug}` : `/search?q=${encodeURIComponent(getProductName(product))}`;
}

function getDiscountedPrice(product) {
  const price = Number(product.price || 0);
  const discount = Number(product.discountPercentage || 0);
  return (price - (price * discount) / 100).toFixed(2);
}

function ServiceFeature({ Icon, title, subtitle, borderRight = false }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 ${borderRight ? "border-r border-gray-200" : ""}`}
    >
      <div className="flex h-8 w-8 items-center justify-center text-[#2DA5F3]">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#191C1F]">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function SearchBarSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="flex items-center overflow-hidden rounded-lg border border-[#E4E7E9] bg-white shadow-sm"
      >
        <div className="flex items-center gap-2 border-r border-[#E4E7E9] px-4">
          <FiSearch className="text-gray-400" size={20} />
          <select className="min-w-[120px] border-none bg-transparent py-3 text-sm text-gray-600 outline-none">
            <option value="">All Category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anything..."
          className="flex-1 px-4 py-3 text-sm text-[#191C1F] outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-[#FA8232] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E06620]"
        >
          Search
        </button>
      </form>
    </section>
  );
}

function HeroTopSection() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
      <div className="rounded-xl bg-[#F2F4F5] p-8 lg:col-span-2">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <div className="mb-3 flex items-center text-sm font-bold text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              <span className="px-2">THE BEST PLACE TO PLAY</span>
              <span className="h-px w-8 bg-blue-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Xbox Consoles</h1>
            <p className="mb-6 text-gray-600">
              Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-md bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600">
              Shop Now →
            </button>
          </div>

          <div className="relative">
            <img src={xboxImage} alt="xbox" className="w-72" />
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              $299
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative overflow-hidden rounded-xl bg-black p-10 text-white">
          <div className="relative z-10">
            <p className="mb-1 text-sm text-yellow-400">SUMMER SALES</p>
            <h3 className="mb-4 text-lg font-semibold">New Google Pixel 6 Pro</h3>
            <button className="group inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm transition-colors hover:bg-orange-600">
              Shop Now →
            </button>
          </div>
          <img src={phoneImage} alt="pixel" className="absolute bottom-0 right-0 w-40" />
          <div className="absolute right-4 top-5 rounded bg-yellow-400 px-3 py-2 text-xs text-black">
            29% OFF
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-10 shadow">
          <img src={budsImage} alt="buds" className="w-40 object-cover" />
          <div>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">Xiaomi FlipBuds Pro</h3>
            <p className="mb-4 font-semibold text-blue-600">$299 USD</p>
            <button className="group inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm text-white transition-colors hover:bg-orange-600">
              Shop Now →
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow lg:col-span-3">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <ServiceFeature Icon={FiTruck} title="Fastest Delivery" subtitle="Delivery in 24H" borderRight />
          <ServiceFeature
            Icon={FiRefreshCw}
            title="24 Hours Return"
            subtitle="100% money-back"
            borderRight
          />
          <ServiceFeature
            Icon={FiCreditCard}
            title="Secure Payment"
            subtitle="Your money is safe"
            borderRight
          />
          <ServiceFeature Icon={FiHeadphones} title="Support 24/7" subtitle="Live contact/message" />
        </div>
      </div>
    </section>
  );
}

function BigDealCard({ product }) {
  const { state, dispatch } = useStore();
  const inWishlist = state.wishlist.some((item) => item.id === product.id);
  const title = getProductName(product);
  const href = getProductHref(product);
  const price = Number(product.price || 0);
  const discounted = getDiscountedPrice(product);
  const rating = Math.round(Number(product.rating || 0));

  return (
    <article className="mx-auto flex h-[600px] w-full max-w-[330px] flex-col border border-gray-200 bg-white lg:mx-0">
      <img src={product.image} alt={title} className="h-[300px] w-full object-contain" />
      <div className="flex flex-1 flex-col px-4 py-4">
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) =>
            index < rating ? (
              <IoStar key={index} className="text-yellow-400" size={19} />
            ) : (
              <IoStarOutline key={index} className="text-gray-300" size={19} />
            )
          )}
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-snug text-gray-900">{title}</h3>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-base text-[#ADB7BC] line-through">${price.toFixed(2)}</span>
          <span className="text-xl font-semibold text-[#2DA5F3]">${discounted}</span>
        </div>
        <p className="mb-6 line-clamp-5 text-sm leading-relaxed text-gray-600">{product.description}</p>

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}
            className={`flex h-11 w-11 items-center justify-center border ${inWishlist
              ? "border-[#FA8232] bg-[#FA8232] text-white"
              : "border-[#FFE7D6] bg-[#FFE7D6] text-[#191C1F]"
              }`}
            aria-label="Favorite"
          >
            <FiHeart size={18} />
          </button>

          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <FiShoppingCart size={17} />
            <span>Add to Cart</span>
          </button>

          <Link to={href} className="h-11 w-11">
            <div className="flex h-11 w-11 items-center justify-center border border-[#FFE7D6] bg-[#FFE7D6] text-[#191C1F] transition-colors hover:bg-orange-100">
              <FiEye size={18} />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}

function DealCard({ product }) {
  const { state, dispatch } = useStore();
  const inWishlist = state.wishlist.some((item) => item.id === product.id);
  const inCart = state.cart.some((item) => item.id === product.id);
  const title = getProductName(product);
  const href = getProductHref(product);
  const price = Number(product.price || 0);
  const discounted = getDiscountedPrice(product);

  return (
    <article className="group relative flex h-[300px] w-full flex-col overflow-hidden border border-[#E4E7E9] bg-white">
      <img src={product.image} alt={title} className="mt-4 h-[160px] w-full object-contain" />

      <div className="absolute bottom-[70px] left-2 right-2 top-2 flex items-center justify-center gap-3 rounded bg-gray-300/30 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${inWishlist ? "bg-[#FA8232] text-white" : "bg-white text-[#191C1F] hover:bg-[#FA8232] hover:text-white"
            }`}
          aria-label="Favorite"
        >
          <FiHeart size={16} />
        </button>

        <button
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${inCart ? "bg-[#FA8232] text-white" : "bg-white text-[#191C1F] hover:bg-[#FA8232] hover:text-white"
            }`}
          aria-label="Add to cart"
        >
          <FiShoppingCart size={16} />
        </button>

        <Link to={href} className="h-9 w-9">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#191C1F] transition-colors hover:bg-[#FA8232] hover:text-white">
            <FiEye size={16} />
          </div>
        </Link>
      </div>

      <div className="flex h-[110px] flex-col justify-end px-3 py-2">
        <h4 className="mb-1 line-clamp-2 text-sm font-medium text-[#191C1F]">{title}</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#ADB7BC] line-through">${price.toFixed(2)}</span>
          <span className="text-sm font-semibold text-[#2DA5F3]">${discounted}</span>
        </div>
      </div>
    </article>
  );
}

function BestDealsSection({ products, loading }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    const timer = setInterval(() => {
      const diff = endDate - new Date();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = products.slice(0, 9);

  if (loading && deals.length < 9) {
    return null;
  }

  if (deals.length < 9) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h2 className="text-[20px] font-semibold leading-[28px] text-[#191C1F] md:text-[24px] md:leading-[32px]">
            Best Deals
          </h2>
          <div className="flex h-[36px] w-fit items-center justify-center rounded bg-[#F3DE6D] px-3 text-[13px] font-normal text-black md:text-[14px] md:leading-[20px]">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
        </div>
        <Link to="/search?q=all" className="w-fit text-sm font-semibold text-blue-600 hover:underline md:text-base">
          Browse All Products →
        </Link>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full flex-shrink-0 lg:w-[300px] xl:w-[340px]">
          <BigDealCard product={deals[0]} />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
          {deals.slice(1).map((product) => (
            <DealCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection({ categories }) {
  return (
    <section className="relative mx-auto max-w-7xl px-3 py-8 sm:px-4 md:py-12">
      <h1 className="mb-5 text-center text-[22px] font-semibold leading-[30px] text-[#191C1F] sm:text-[26px] sm:leading-[34px] md:mb-8 md:text-[32px] md:leading-[40px]">
        Shop with Categories
      </h1>

      <div className="relative">
        <Swiper
          loop
          centeredSlides
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom"
          }}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2.5, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 14 },
            768: { slidesPerView: 3.5, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 18 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
            1440: { slidesPerView: 6, spaceBetween: 20 }
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.slug} className="flex justify-center">
              <div className="group relative h-[105px] w-[135px] cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md sm:h-[120px] sm:w-[155px] md:h-[140px] md:w-[180px] lg:h-[160px] lg:w-[200px]">
                <div className="circle-hover absolute bottom-0 left-0 h-12 w-12 origin-bottom-left rounded-br-full rounded-tr-full bg-[#FA8232] sm:h-14 sm:w-14 md:h-16 md:w-16" />
                <span className="relative flex h-full items-center justify-center px-2 text-center text-[13px] font-medium text-gray-900 transition-colors duration-500 group-hover:text-white sm:text-[14px] md:text-[16px]">
                  {category.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev-custom absolute -left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#FA8232] text-white shadow-md transition-colors hover:bg-[#e06a00] md:-left-5 md:h-10 md:w-10">
          <FiChevronLeft size={18} />
        </button>
        <button className="swiper-button-next-custom absolute -right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#FA8232] text-white shadow-md transition-colors hover:bg-[#e06a00] md:-right-5 md:h-10 md:w-10">
          <FiChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function FeaturedProductsSection({ catalog, loading }) {
  const [activeTab, setActiveTab] = useState("all");

  const availableTabs = ["all", "beauty", "fragrances", "furniture", "groceries"];

  const filtered = useMemo(() => {
    const list =
      activeTab === "all"
        ? catalog
        : catalog.filter((item) => item.category.toLowerCase() === activeTab);
    return list.slice(0, 8);
  }, [activeTab, catalog]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6">
        <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-[#F3DE6D] to-[#E9CF4E] lg:col-span-2 lg:w-[320px] lg:h-[650px]">
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="text-xs font-semibold uppercase text-orange-600">
              Computer & Accessories
            </span>
            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">32% Discount</h3>
            <p className="mt-2 text-sm text-gray-700">For all electronics products</p>
            <p className="mt-4 text-xs text-gray-600">Offers ends in:</p>
            <div className="mt-1 bg-white px-3 py-1 text-xs font-semibold">ENDS OF CHRISTMAS</div>
            <button className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-orange-500 px-6 py-2 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600">
              Shop Now <FiArrowRight size={14} />
            </button>
          </div>
          <div className="mt-4 flex w-full flex-shrink-0 items-center justify-center">
            <img
              src={offerImage}
              alt="Offer"
              className="h-auto max-h-[300px] w-full object-contain lg:max-h-none"
            />
          </div>
        </div>

        <div className="flex h-full flex-col lg:col-span-4">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 py-2 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <div className="flex w-full flex-wrap items-center gap-2 text-sm sm:w-auto sm:gap-4">
              {availableTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer capitalize ${activeTab === tab
                    ? "font-medium text-orange-500"
                    : "text-gray-500 hover:text-gray-800"
                    }`}
                >
                  {toCategoryName(tab)}
                </button>
              ))}
              <Link
                to="/search?q=all"
                className="w-fit text-sm font-semibold text-blue-600 hover:underline md:text-base"
              >
                Browse All Products <FiArrowRight size={14} className="inline" />
              </Link>
            </div>
          </div>

          <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {loading && !filtered.length && <p>Loading...</p>}
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivalsSection({ catalog, loading }) {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = ["all", "laptops", "home-decoration", "mens-shirts", "womens-bags"];

  const filtered = useMemo(() => {
    const list =
      activeTab === "all"
        ? catalog.filter((item) =>
          ["laptops", "home-decoration", "mens-shirts", "womens-bags"].includes(
            item.category.toLowerCase()
          )
        )
        : catalog.filter((item) => item.category.toLowerCase() === activeTab);

    return list.slice(0, 8);
  }, [activeTab, catalog]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* INTRODUCING Section - Apple Homepod Mini & Xiaomi Mi 11 Ultra */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="relative flex min-h-[220px] flex-col overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 text-white">
          <div className="absolute right-4 top-4">
            <FaVolumeUp className="h-16 w-16 text-white/10" />
          </div>
          <span className="relative z-10 inline-block w-fit rounded bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            INTRODUCING
          </span>
          <h3 className="relative z-10 mt-4 text-2xl font-bold">New Apple Homepod Mini</h3>
          <p className="relative z-10 mt-2 text-sm text-gray-300">
            Jam-packed with innovation, HomePod mini delivers unexpectedly.
          </p>
          <button className="relative z-10 mt-auto inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300">
            SHOP NOW <FiArrowRight size={12} />
          </button>
        </div>

        {/* INTRODUCING NEW - Xiaomi Mi 11 Ultra */}
        <div className="relative flex min-h-[220px] flex-col overflow-hidden rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] p-6 text-white">
          <div className="absolute right-4 top-4">
            <MdSmartphone className="h-16 w-16 text-white/10" />
          </div>
          <span className="relative z-10 inline-block w-fit rounded bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            INTRODUCING NEW
          </span>
          <h3 className="relative z-10 mt-4 text-2xl font-bold">Xiaomi Mi 11 Ultra 12GB+256GB</h3>
          <p className="relative z-10 mt-2 text-sm text-white/80">
            *Data provided by internal laboratories. Industry measurement.
          </p>
          <button className="relative z-10 mt-auto inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-white hover:text-white/80">
            SHOP NOW <FiArrowRight size={12} />
          </button>
          <p className="absolute bottom-6 right-6 text-3xl font-bold">$590</p>
        </div>
      </div>

      {/* New Arrivals Title and Tabs */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 py-2 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">New Arrivals</h2>
        <div className="flex w-full flex-wrap items-center gap-2 text-sm sm:w-auto sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer capitalize ${activeTab === tab
                ? "font-medium text-orange-500"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {toCategoryName(tab)}
            </button>
          ))}
          <Link
            to="/search?q=all"
            className="w-fit text-sm font-semibold text-blue-600 hover:underline md:text-base"
          >
            Browse All Products →
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {loading && !filtered.length && <p>Loading...</p>}
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Xiaomi True Wireless Earbuds */}
      <div className="mt-10 flex min-h-[180px] items-center justify-between overflow-hidden rounded-lg bg-[#F7E99E] p-6">
        <div className="flex items-center gap-6">
          <img
            src={xiaomiEarbuds}
            alt="Xiaomi Earbuds"
            className="h-[100px] w-[100px] object-contain"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Xiaomi True Wireless Earbuds</h3>
            <p className="mt-1 text-sm text-gray-700">
              Escape the noise, it's time to hear the magic with Xiaomi Earbuds.
            </p>
            <p className="mt-2 text-sm text-[#475156]">
              Only for: <span className="ml-1 bg-white px-2 py-0.5 text-sm font-semibold">$299 USD</span>
            </p>
            <button className="mt-3 inline-flex items-center gap-2 bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Summer Sales */}
      <div className="mt-6 overflow-hidden rounded-lg bg-[#124261] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block rounded bg-[#FFFFFF1F] px-3 py-1 text-xs font-semibold text-[#EBC80E]">
              Summer Sales
            </span>
            <h3 className="mt-3 text-3xl font-bold">37% Discount</h3>
            <p className="mt-2 text-sm text-blue-100">Only for SmartPhone products.</p>
            <button className="mt-4 inline-flex cursor-pointer items-center gap-2 bg-[#2DA5F3] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600">
              Shop Now
            </button>
          </div>
          <img src={xboxImage} alt="Xbox" className="h-[120px] w-auto object-contain" />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch(PRODUCTS_ENDPOINT, { signal: controller.signal }),
          fetch(CATEGORIES_ENDPOINT, { signal: controller.signal })
        ]);

        if (!productRes.ok || !categoryRes.ok) {
          throw new Error("Failed to fetch remote catalog");
        }

        const productJson = await productRes.json();
        const categoryJson = await categoryRes.json();

        const normalizedProducts = Array.isArray(productJson.products)
          ? productJson.products.map(normalizeProduct)
          : [];
        const normalizedCategories = Array.isArray(categoryJson)
          ? categoryJson.map(normalizeCategory)
          : [];

        setProducts(normalizedProducts);
        setCategories(normalizedCategories);
      } catch {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const catalog = products.length ? products : fallbackProducts;
  const categoryList = categories.length
    ? categories
    : fallbackCategories.map((item) => ({
      slug: item.name.toLowerCase().replace(/\s+/g, "-"),
      name: item.name
    }));

  return (
    <div>
      <SearchBarSection />
      <HeroTopSection />
      <BestDealsSection products={catalog} loading={loading} />
      <CategoriesSection categories={categoryList} />
      <FeaturedProductsSection catalog={catalog} loading={loading} />
      <NewArrivalsSection catalog={catalog} loading={loading} />
    </div>
  );
}
