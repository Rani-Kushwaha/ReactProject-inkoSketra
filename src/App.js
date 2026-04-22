import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Contact from "./pages/Contact";
import Customization from "./pages/Customization";
import { AdminProvider } from "./context/AdminContext";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminCreators from "./pages/Admin/AdminCreators";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const key = `${product.id}-${product.size || "A4"}`;
      const existing = prev.find((i) => `${i.id}-${i.size || "A4"}` === key);
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.size || "A4"}` === key
            ? { ...i, qty: i.qty + (product.qty || 1) }
            : i
        );
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AdminProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<Product onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/category/:slug" element={<Home onAddToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customization" element={<Customization />} />
          
          {/* Admin Routes - Make sure these are EXACTLY as written */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/creators" element={<AdminCreators />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;