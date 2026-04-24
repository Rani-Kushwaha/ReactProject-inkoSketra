import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import products from "../services/products";

const sizes = [
  { label: "A4", dims: "8.3 × 11.7 in", price: 0 },
  { label: "A3", dims: "11.7 × 16.5 in", price: 199 },
  { label: "A2", dims: "16.5 × 23.4 in", price: 399 },
  { label: "A1", dims: "23.4 × 33.1 in", price: 599 },
];

function Product({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check wishlist status
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.some(item => item.id === product?.id));
  }, [product]);

  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-black text-gray-800 mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6">This poster may have sold out or been removed.</p>
        <button onClick={() => navigate("/")} className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition">
          Back to Home
        </button>
      </div>
    );
  }

  const finalPrice = product.price + sizes[selectedSize].price;

  const handleAddToCart = () => {
    const productWithDetails = {
      ...product,
      size: sizes[selectedSize].label,
      qty: quantity,
      price: finalPrice
    };
    onAddToCart(productWithDetails);
    setAdded(true);
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleWishlist = () => {
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
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <button onClick={() => navigate("/")} className="hover:text-red-600 transition">Home</button>
          <span>/</span>
          <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-red-600 transition capitalize">
            {product.subcategory}
          </button>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main section */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative bg-gray-100 aspect-[3/4] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {product.tag && (
                <div className="absolute top-5 left-5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {product.tag}
                </div>
              )}
              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:scale-110 transition"
              >
                <span className={`text-2xl ${isWishlisted ? "text-red-500" : "text-gray-700"}`}>
                  {isWishlisted ? "❤️" : "🤍"}
                </span>
              </button>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              <p className="text-xs text-red-500 uppercase tracking-widest font-bold mb-2">{product.subcategory}</p>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex text-amber-400">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
                <span className="text-sm text-gray-500">(128 reviews)</span>
              </div>

              <p className="text-gray-600 text-base leading-relaxed mb-6">{product.description || "Premium quality poster printed on high-grade paper. Perfect for home decor, office, or gifting."}</p>

              {/* Size picker */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">SELECT SIZE</p>
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(i)}
                      className={`border-2 rounded-xl p-3 text-left transition-all
                        ${selectedSize === i
                          ? "border-red-600 bg-red-50"
                          : "border-gray-200 hover:border-gray-400"
                        }`}
                    >
                      <div className="font-black text-gray-900">{s.label}</div>
                      <div className="text-xs text-gray-500">{s.dims}</div>
                      <div className="text-sm font-bold text-red-600 mt-1">
                        ₹{product.price + s.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">QUANTITY</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold hover:border-red-600 transition"
                  >−</button>
                  <span className="text-xl font-black w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold hover:border-red-600 transition"
                  >+</button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-black text-gray-900">₹{finalPrice * quantity}</span>
                <span className="text-gray-400 text-sm">incl. taxes</span>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all
                    ${added
                      ? "bg-green-500 text-white"
                      : "bg-black text-white hover:bg-red-600 hover:scale-[1.02] shadow-xl"
                    }`}
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-2xl font-black text-lg bg-red-600 text-white hover:bg-red-700 transition shadow-xl shadow-red-600/30"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                {[["🚚", "Free Shipping", "Orders ₹999+"],
                ["↩️", "Easy Returns", "7-day policy"],
                ["🔒", "Secure Payment", "100% safe"]].map(([icon, title, sub]) => (
                  <div key={title} className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{title}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-1 bg-red-600 rounded" />
              <h2 className="text-xl font-black text-gray-900">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl cursor-pointer transition group"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-sm text-gray-900 truncate">{p.name}</p>
                    <p className="text-red-600 font-black text-sm mt-1">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;