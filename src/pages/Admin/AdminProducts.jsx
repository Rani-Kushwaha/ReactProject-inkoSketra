import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminProducts = () => {
  const { allProducts, addProduct, updateProduct, deleteProduct, approveProduct, getPendingProducts } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const pendingProducts = getPendingProducts();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "anime",
    subcategory: "",
    tag: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({
      name: "", price: "", image: "", category: "anime", subcategory: "", tag: "", description: ""
    });
  };

  const displayedProducts = activeTab === "all" ? allProducts : pendingProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Product Management</h1>
              <p className="text-gray-500 text-sm mt-1">Manage all posters and products</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              + Add New Product
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-bold rounded-lg transition ${
                activeTab === "all" ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Products ({allProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 font-bold rounded-lg transition ${
                activeTab === "pending" ? "bg-yellow-500 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Pending Approval ({pendingProducts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-red-600 font-bold text-lg">₹{product.price}</p>
                  </div>
                  {product.status === "pending_approval" && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-2">{product.category}</p>
                
                <div className="flex gap-2 mt-4">
                  {product.status === "pending_approval" && (
                    <button
                      onClick={() => approveProduct(product.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-xl font-bold hover:bg-green-700"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setFormData(product);
                      setShowAddModal(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-black">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="anime">Anime</option>
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="supercar">Supercars</option>
                <option value="movies">Movies / TV</option>
              </select>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
              />
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;