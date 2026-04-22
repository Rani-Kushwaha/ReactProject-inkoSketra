import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

const CreatorPortal = ({ creatorId }) => {
  const { getProductsByCreator, addProduct } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "anime",
    description: "",
  });

  const myProducts = getProductsByCreator(creatorId);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData, creatorId);
    setShowAddModal(false);
    setFormData({ name: "", price: "", image: "", category: "anime", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-500">Manage your products and track sales</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            + Add New Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md p-4">
              <img src={product.image} className="w-full h-48 object-cover rounded-xl" />
              <h3 className="font-bold mt-3">{product.name}</h3>
              <p className="text-red-600 font-bold">₹{product.price}</p>
              {product.status === "pending_approval" && (
                <p className="text-yellow-600 text-sm mt-2">⏳ Waiting for admin approval</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-black mb-4">Submit New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="anime">Anime</option>
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
              </select>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
              >
                Submit for Approval
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorPortal;