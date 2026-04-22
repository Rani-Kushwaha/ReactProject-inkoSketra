import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const AdminDashboard = () => {
  const { adminData, adminLogout, getStats, orders } = useAdmin();
  const navigate = useNavigate();
  const stats = getStats();

  // Chart data
  const salesData = [
    { name: "Mon", sales: 12 },
    { name: "Tue", sales: 19 },
    { name: "Wed", sales: 15 },
    { name: "Thu", sales: 22 },
    { name: "Fri", sales: 28 },
    { name: "Sat", sales: 35 },
    { name: "Sun", sales: 18 },
  ];

  const categoryData = [
    { name: "Anime", value: 45 },
    { name: "Cricket", value: 25 },
    { name: "Football", value: 20 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Welcome, {adminData?.name}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/admin/products")}
                className="px-4 py-2 text-gray-600 hover:text-red-600 transition font-semibold"
              >
                Products
              </button>
              <button
                onClick={() => navigate("/admin/creators")}
                className="px-4 py-2 text-gray-600 hover:text-red-600 transition font-semibold"
              >
                Creators
              </button>
              <button
                onClick={() => navigate("/admin/orders")}
                className="px-4 py-2 text-gray-600 hover:text-red-600 transition font-semibold"
              >
                Orders
              </button>
              <button
                onClick={adminLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-3xl font-black text-gray-900">{stats.totalProducts}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <p className="text-gray-500 text-sm">Pending Approval</p>
            <p className="text-3xl font-black text-yellow-600">{stats.pendingProducts}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <p className="text-gray-500 text-sm">Total Creators</p>
            <p className="text-3xl font-black text-gray-900">{stats.totalCreators}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-3xl font-black text-gray-900">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-3xl font-black text-green-600">₹{stats.totalRevenue}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-black text-gray-900 mb-4">Weekly Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-black text-gray-900 mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-black text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono">#{order.id}</td>
                    <td className="px-6 py-4 text-sm">{order.customerName || "Guest"}</td>
                    <td className="px-6 py-4 text-sm font-bold">₹{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === "completed" ? "bg-green-100 text-green-700" :
                        order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;