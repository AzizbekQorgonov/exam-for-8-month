import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import SuccessPage from "./pages/SuccessPage";
import WishlistPage from "./pages/WishlistPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
