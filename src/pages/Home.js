import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import products from "../services/products";

const categories = [
  { label: "Anime", icon: "⛩️", path: "/category/anime", bg: "from-purple-600 to-indigo-700" },
  { label: "Cricket", icon: "🏏", path: "/category/cricket", bg: "from-blue-600 to-cyan-600" },
  { label: "Football", icon: "⚽", path: "/category/football", bg: "from-green-600 to-emerald-600" },
  { label: "Supercars", icon: "🏎️", path: "/category/supercar", bg: "from-red-600 to-orange-500" },
  { label: "Movies / TV", icon: "🎬", path: "/category/movies", bg: "from-yellow-500 to-amber-600" },
  { label: "Music", icon: "🎸", path: "/category/music", bg: "from-pink-600 to-rose-600" },
  { label: "Bikes", icon: "🏍️", path: "/category/bikes", bg: "from-gray-700 to-gray-900" },
  { label: "Motivation", icon: "💪", path: "/category/motivational", bg: "from-orange-500 to-red-600" },
];

const tagColors = {
  Bestseller: "bg-amber-500 text-white",
  New: "bg-green-500 text-white",
  Premium: "bg-purple-600 text-white",
  "Cult Classic": "bg-gray-800 text-white",
};

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      const updated = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      const updated = [...wishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(true);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative"
    >
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
      >
        <span className={`text-xl ${isWishlisted ? "text-red-500" : "text-gray-400"}`}>
          {isWishlisted ? "❤️" : "🤍"}
        </span>
      </button>

      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full ${tagColors[product.tag] || "bg-gray-700 text-white"}`}>
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
            More Sizes Available
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{product.subcategory}</p>
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-2 flex-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 mr-1">From</span>
            <span className="text-lg font-black text-gray-900">₹{product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`text-sm font-bold px-4 py-2 rounded-xl transition-all duration-200
              ${added
                ? "bg-green-500 text-white scale-95"
                : "bg-black text-white hover:bg-red-600 hover:scale-105"
              }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({ onAddToCart }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All" },
    { key: "anime", label: "Anime" },
    { key: "cricket", label: "Cricket" },
    { key: "football", label: "Football" },
    { key: "supercar", label: "Supercars" },
    { key: "movies", label: "Movies / TV" },
    { key: "motivational", label: "Motivational" },
  ];

  const filtered = activeFilter === "all"
    ? products
    : products.filter((p) => p.category === activeFilter);

  const newArrivals = products.filter((p) => p.tag === "New");


  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1400&h=600&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-white">
            <span className="inline-block bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              🔥 New Collection
            </span>
            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight">
              COLLAGE<br />
              <span className="text-red-500">KITS</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Premium quality anime, sports & lifestyle posters. Delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/category/posters")}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-red-600/30"
              >
                SHOP NOW
              </button>
              <button
                onClick={() => navigate("/category/collage")}
                className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:bg-white/10"
              >
                View Collage Kits
              </button>
            </div>
            <div className="flex gap-8 mt-10">
              {[["500+", "Designs"], ["10K+", "Orders"], ["4.9★", "Rating"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white">{n}</div>
                  <div className="text-gray-400 text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 hidden lg:flex flex-col gap-4">
            {[
              ["⚡ Buy 1", "Get 2 Free"],
              ["⚡ Buy 4", "Get 5 Free"],
              ["⚡ Buy 6", "Get 15 Free"],
            ].map(([a, b]) => (
              <div key={a} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-6 py-4 text-white text-center min-w-44">
                <div className="text-2xl font-black">{a}</div>
                <div className="text-red-400 font-bold text-sm">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(cat.path)}
              className={`bg-gradient-to-br ${cat.bg} text-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-md hover:shadow-xl`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-bold text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-red-600 rounded" />
            <h2 className="text-2xl font-black text-gray-900">New Arrivals</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart || (() => { })} />
            ))}
          </div>
        </section>
      )}

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
        <div className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, red 0%, transparent 50%)" }}
          />
          <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="text-white">
              <p className="text-red-400 font-bold text-sm uppercase tracking-widest mb-2">Limited Time Offer</p>
              <h3 className="text-3xl font-black">Buy 2 Get 6 Split Posters</h3>
              <p className="text-gray-300 mt-1">+ FREE shipping on all orders above ₹999</p>
            </div>
            <button
              onClick={() => navigate("/category/split")}
              className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 flex-shrink-0"
            >
              GRAB DEAL →
            </button>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS with filter */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-1 bg-red-600 rounded" />
          <h2 className="text-2xl font-black text-gray-900">All Posters</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all
                ${activeFilter === f.key
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-red-300 hover:text-red-600"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart || (() => { })} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">😔</p>
            <p className="font-semibold">No products found in this category yet.</p>
          </div>
        )}
      </section>

      {/* Footer strip */}
      <div className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2025 AnimeStore — Premium Posters Delivered Across India</p>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <button onClick={() => navigate("/privacy")} className="hover:text-white transition">Privacy Policy</button>
          <button onClick={() => navigate("/terms")} className="hover:text-white transition">Terms of Service</button>
          <button onClick={() => navigate("/contact")} className="hover:text-white transition">Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default Home;