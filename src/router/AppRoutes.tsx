import { Routes, Route } from "react-router-dom";
import { ProductListingPage } from "../pages/ProductListingPage/ProductListingPage";
import { ProductDetailPage } from "../pages/ProductDetailPage/ProductDetailPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div style={{ padding: "64px 24px", textAlign: "center" }}>
      <h1>404</h1>
      <p>That page doesn't exist.</p>
    </div>
  );
}
