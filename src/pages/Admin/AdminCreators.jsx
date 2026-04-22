import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminCreators = () => {
  const { creators, addCreator, updateCreatorStatus, removeCreator } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    commission: 10,
    storeName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCreator(formData);
    setShowAddModal(false);
    setFormData({ name: "", email: "", phone: "", commission: 10, storeName: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Creator Management</h1>
              <p className="text-gray-500 text-sm mt-1">Manage third-party sellers and commissions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              + Add New Creator
            </button>
          </div>
        </div>
      </div>

      {/* Creators Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <div key={creator.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg">{creator.name}</h3>
                    <p className="text-gray-500 text-sm">{creator.storeName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    creator.status === "approved" ? "bg-green-100 text-green-700" :
                    creator.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {creator.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="font-semibold">Email:</span> {creator.email}</p>
                  <p className="text-sm"><span className="font-semibold">Phone:</span> {creator.phone}</p>
                  <p className="text-sm"><span className="font-semibold">Commission:</span> {creator.commission}%</p>
                  <p className="text-sm"><span className="font-semibold">Total Sales:</span> ₹{creator.totalSales || 0}</p>
                </div>

                <div className="flex gap-2">
                  {creator.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateCreatorStatus(creator.id, "approved")}
                        className="flex-1 bg-green-600 text-white py-2 rounded-xl font-bold hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateCreatorStatus(creator.id, "rejected")}
                        className="flex-1 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {creator.status !== "pending" && (
                    <button
                      onClick={() => removeCreator(creator.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Creator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-black">Add New Creator</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <input
                type="text"
                placeholder="Store/Brand Name"
                value={formData.storeName}
                onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <input
                type="number"
                placeholder="Commission Percentage (%)"
                value={formData.commission}
                onChange={(e) => setFormData({...formData, commission: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold"
                >
                  Add Creator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreators;