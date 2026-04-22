import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [creators, setCreators] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const savedAdmin = localStorage.getItem("adminData");
    
    if (adminToken && savedAdmin) {
      setIsAdminLoggedIn(true);
      setAdminData(JSON.parse(savedAdmin));
    }

    // Load creators
    const savedCreators = localStorage.getItem("creators");
    if (savedCreators) setCreators(JSON.parse(savedCreators));

    // Load products
    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) setAllProducts(JSON.parse(savedProducts));

    // Load orders
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Admin Login
  const adminLogin = (email, password) => {
    // Demo admin credentials - change this in production
    if (email === "admin@animestore.com" && password === "admin123") {
      const token = "demo-token-" + Date.now();
      const admin = { email, name: "Admin User", role: "super_admin" };
      
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));
      
      setIsAdminLoggedIn(true);
      setAdminData(admin);
      toast.success("Welcome back, Admin!");
      return true;
    }
    toast.error("Invalid credentials!");
    return false;
  };

  // Admin Logout
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setIsAdminLoggedIn(false);
    setAdminData(null);
    toast.success("Logged out successfully");
  };

  // Add Creator (Third-party seller)
  const addCreator = (creator) => {
    const newCreator = {
      id: Date.now(),
      ...creator,
      status: "pending",
      totalSales: 0,
      totalEarnings: 0,
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...creators, newCreator];
    setCreators(updated);
    localStorage.setItem("creators", JSON.stringify(updated));
    toast.success(`Creator ${creator.name} added successfully!`);
    return newCreator;
  };

  // Update Creator Status (Approve/Reject)
  const updateCreatorStatus = (creatorId, status) => {
    const updated = creators.map(creator =>
      creator.id === creatorId ? { ...creator, status } : creator
    );
    setCreators(updated);
    localStorage.setItem("creators", JSON.stringify(updated));
    toast.success(`Creator status updated to ${status}`);
  };

  // Remove Creator
  const removeCreator = (creatorId) => {
    const updated = creators.filter(creator => creator.id !== creatorId);
    setCreators(updated);
    localStorage.setItem("creators", JSON.stringify(updated));
    toast.success("Creator removed");
  };

  // Add Product (by Admin or Creator)
  const addProduct = (product, creatorId = null) => {
    const newProduct = {
      id: Date.now(),
      ...product,
      creatorId: creatorId,
      createdAt: new Date().toISOString(),
      status: creatorId ? "pending_approval" : "approved",
    };
    
    const updated = [...allProducts, newProduct];
    setAllProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
    
    if (creatorId) {
      toast.success("Product submitted for approval");
    } else {
      toast.success("Product added successfully!");
    }
    return newProduct;
  };

  // Update Product
  const updateProduct = (productId, updatedData) => {
    const updated = allProducts.map(product =>
      product.id === productId ? { ...product, ...updatedData } : product
    );
    setAllProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
    toast.success("Product updated!");
  };

  // Delete Product
  const deleteProduct = (productId) => {
    const updated = allProducts.filter(product => product.id !== productId);
    setAllProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
    toast.success("Product deleted!");
  };

  // Approve Product (for creator submissions)
  const approveProduct = (productId) => {
    const updated = allProducts.map(product =>
      product.id === productId ? { ...product, status: "approved" } : product
    );
    setAllProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
    toast.success("Product approved and live!");
  };

  // Get Products by Creator
  const getProductsByCreator = (creatorId) => {
    return allProducts.filter(product => product.creatorId === creatorId);
  };

  // Get Pending Products
  const getPendingProducts = () => {
    return allProducts.filter(product => product.status === "pending_approval");
  };

  // Add Order
  const addOrder = (order) => {
    const newOrder = {
      id: Date.now(),
      ...order,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [...orders, newOrder];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  // Update Order Status
  const updateOrderStatus = (orderId, status) => {
    const updated = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success(`Order status updated to ${status}`);
  };

  // Get Stats
  const getStats = () => {
    const approvedProducts = allProducts.filter(p => p.status === "approved");
    const pendingProducts = allProducts.filter(p => p.status === "pending_approval");
    const activeCreators = creators.filter(c => c.status === "approved");
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === "pending").length;

    return {
      totalProducts: approvedProducts.length,
      pendingProducts: pendingProducts.length,
      totalCreators: activeCreators.length,
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
    };
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminData,
        creators,
        allProducts,
        orders,
        adminLogin,
        adminLogout,
        addCreator,
        updateCreatorStatus,
        removeCreator,
        addProduct,
        updateProduct,
        deleteProduct,
        approveProduct,
        getProductsByCreator,
        getPendingProducts,
        addOrder,
        updateOrderStatus,
        getStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};