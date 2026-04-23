import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-red-600 font-bold">₹{item.price}</p>
                  {item.size && (
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full font-bold hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full font-bold hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-600 text-sm font-semibold hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-black text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-black text-red-600">₹{getTotal()}</span>
              </div>
              <button
                onClick={() => alert("Checkout feature coming soon!")}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;