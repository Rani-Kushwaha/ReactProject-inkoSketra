import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "Split Posters",
    path: "/category/split",
    mega: [
      { label: "Anime Split Posters", path: "/category/anime-split" },
      { label: "Spiritual Split Posters", path: "/category/spiritual-split" },
      { label: "Military / Fighter Jets", path: "/category/military-split" },
      { label: "Supercars Split Posters", path: "/category/supercar-split" },
      { label: "Movies / T.V Split Poster", path: "/category/movies-split" },
      { label: "F1 Split Posters", path: "/category/f1-split" },
      { label: "Superbikes Split Posters", path: "/category/bikes-split" },
      { label: "Superheroes Split Posters", path: "/category/superheroes-split" },
      { label: "Motivational Split Posters", path: "/category/motivational-split" },
      { label: "Cricket Split Posters", path: "/category/cricket-split" },
      { label: "Football Split Posters", path: "/category/football-split" },
      { label: "Music Split Posters", path: "/category/music-split" },
      { label: "Basketball Split Posters", path: "/category/basketball-split" },
      { label: "Gaming Split Posters", path: "/category/gaming-split" },
    ],
  },
  {
    label: "Posters",
    path: "/category/posters",
    mega: [
      { label: "T.V Series / Movies Posters", path: "/category/movies" },
      { label: "Supercar / Bikes", path: "/category/supercar" },
      { label: "Cricket Posters", path: "/category/cricket" },
      { label: "Football Posters", path: "/category/football" },
      { label: "Music Posters", path: "/category/music" },
      { label: "Anime Posters", path: "/category/anime" },
      { label: "Quotes Posters", path: "/category/motivational" },
    ],
  },
  {
    label: "Collage / Block Kits",
    path: "/category/collage",
    mega: null,
  },
  {
    label: "Customization",
    path: "/customization",
    mega: null,
  },
  {
    label: "Happy Customers",
    path: "/happy-customers",
    mega: null,
  },
  {
    label: "Contact",
    path: "/contact",
    mega: null,
  },
];

function Navbar({ cartCount = 0 }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navRef = useRef(null);
  const navigate = useNavigate();

  // Sync wishlist count from localStorage
  useEffect(() => {
    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlistCount(JSON.parse(savedWishlist).length);
      } else {
        setWishlistCount(0);
      }
    };

    updateWishlistCount();
    window.addEventListener("storage", updateWishlistCount);
    return () => window.removeEventListener("storage", updateWishlistCount);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Marquee ticker */}
      <div className="bg-black text-white text-xs overflow-hidden whitespace-nowrap">
        <div className="animate-marquee py-2 flex gap-12">
          {[
            "🛒 Free Shipping on orders above ₹999",
            "⚡ Buy 1 Get 2 Split Posters",
            "⚡ Buy 2 Get 6 Split Posters",
            "⚡ Buy 4 Get 5 Free",
            "⚡ Buy 5 Get 7 Free",
            "⚡ Buy 6 Get 15 Free",
            "🎁 Use code ANIME10 for 10% off",
            "🛒 Free Shipping on orders above ₹999",
            "⚡ Buy 1 Get 2 Split Posters",
            "⚡ Buy 2 Get 6 Split Posters",
          ].map((t, i) => (
            <span key={i} className="mx-8 font-medium tracking-wide">{t}</span>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <nav
        ref={navRef}
        className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎨</span>
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900 hidden sm:block">
                Anime<span className="text-red-600">Store</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega && setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-5 text-sm font-semibold tracking-wide transition-colors flex items-center gap-1
                      ${openMenu === item.label ? "text-red-600" : "text-gray-700 hover:text-red-600"}
                    `}
                  >
                    {item.label}
                    {item.mega && (
                      <svg
                        className={`w-3 h-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.mega && openMenu === item.label && (
                    <div className="absolute top-full left-0 bg-white shadow-2xl border-t-2 border-red-600 rounded-b-xl z-50 min-w-56 py-3 animate-dropdown">
                      {item.mega.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="block px-5 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                          onClick={() => setOpenMenu(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1">

              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
                {searchOpen && (
                  <form
                    onSubmit={handleSearch}
                    className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-xl flex overflow-hidden w-72 animate-dropdown"
                  >
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search posters..."
                      className="flex-1 px-4 py-3 text-sm outline-none"
                    />
                    <button type="submit" className="px-4 bg-red-600 text-white hover:bg-red-700 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative hidden sm:block">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                  <span className="text-xl">❤️</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                  <span className="text-xl">🛒</span>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white pb-4 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.path}
                  className="block px-6 py-3 font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.mega && (
                  <div className="pl-10 border-l-2 border-red-100 ml-6 mb-1">
                    {item.mega.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="block py-2 text-sm text-gray-500 hover:text-red-600 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile wishlist & cart links */}
            <div className="flex gap-4 px-6 pt-3 border-t border-gray-100 mt-2">
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-pink-500 transition"
                onClick={() => setMobileOpen(false)}
              >
                <span>❤️</span> Wishlist
                {wishlistCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                <span>🛒</span> Cart
                {cartCount > 0 && (
                  <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown {
          animation: dropdown 0.18s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Navbar;