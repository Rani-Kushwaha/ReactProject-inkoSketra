import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Wishlist = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  // ── Read from localStorage (on mount AND whenever storage changes) ──────────
  const loadWishlist = () => {
    try {
      const saved = localStorage.getItem("wishlist");
      setWishlistItems(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    loadWishlist();                                     // read on mount
    window.addEventListener("storage", loadWishlist);  // re-read on change
    return () => window.removeEventListener("storage", loadWishlist);
  }, []);

  // ── Write helpers ────────────────────────────────────────────────────────────
  const saveWishlist = (list) => {
    localStorage.setItem("wishlist", JSON.stringify(list));
    window.dispatchEvent(new Event("storage")); // keep Navbar badge in sync
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter((item) => item.id !== productId);
    setWishlistItems(updated);
    saveWishlist(updated);
    toast("Removed from wishlist", { icon: "💔" });
  };

  const moveToCart = (product) => {
    onAddToCart && onAddToCart(product);
    removeFromWishlist(product.id);
    toast.success("Moved to cart! 🛒");
  };

  // ── Empty state ──────────────────────────────────────────────────────────────
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save your favorite items here!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Wishlist grid ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-1">{wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              {/* Image */}
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Remove heart button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition hover:scale-110"
                  title="Remove from wishlist"
                >
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
                  </svg>
                </button>

                {/* Tag badge */}
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-1 rounded-full uppercase tracking-wide">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
                  {item.subcategory}
                </p>
                <h3
                  className="font-bold text-gray-900 text-base mb-3 cursor-pointer hover:text-red-600 transition leading-tight"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 mr-1">From</span>
                    <span className="text-lg font-black text-gray-900">₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => moveToCart(item)}
                    className="text-sm font-bold px-4 py-2 rounded-xl bg-black text-white hover:bg-red-600 transition-all hover:scale-105"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">Want to explore more?</h2>
          <p className="text-gray-500 mb-4">Discover hundreds of premium posters</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition hover:scale-105"
          >
            Browse All Products →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;