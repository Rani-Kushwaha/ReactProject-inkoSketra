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

function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

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
        <div className="marquee-track py-2 flex gap-12 animate-marquee">
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
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">A</span>
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
                      <svg className={`w-3 h-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
                {searchOpen && (
                  <form onSubmit={handleSearch} className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-xl flex overflow-hidden w-72 animate-dropdown">
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

              {/* Account */}
              <button className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700 hidden sm:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                </svg>
              </button>

              {/* Wishlist */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition text-gray-700 hidden sm:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>
                )}
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 0 0 6.54 17H17M7 13L5.4 5M17 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition"
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
          <div className="lg:hidden border-t border-gray-100 bg-white pb-4">
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
                  <div className="pl-10 border-l-2 border-red-100 ml-6">
                    {item.mega.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="block py-2 text-sm text-gray-600 hover:text-red-600 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
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