import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductList from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import Hizmetler from "./pages/Hizmetler";
import Portfolyo from "./pages/Portfolyo";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />

              
              <Route path="/hizmetler" element={<Hizmetler />} />
              <Route path="/hizmetler/:slug" element={<Hizmetler />} />

            
              <Route path="/portfolyo" element={<Portfolyo />} />
              <Route path="/portfolyo/:slug" element={<Portfolyo />} />

              
              <Route path="/urunler" element={<ProductList />} />
              <Route path="/urunler/:kategoriSlug" element={<CategoryPage />} />
              <Route path="/urunler/:kategoriSlug/:urunSlug" element={<ProductDetail />} />

              
              <Route path="/urun/:id" element={<ProductDetail legacy />} />

              <Route path="/trendyol" element={<ProductList />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="/gizlilik" element={<PrivacyPolicy />} />
              <Route path="/kullanim-sartlari" element={<Terms />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
