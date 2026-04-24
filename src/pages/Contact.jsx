import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send form data
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", phone: "", email: "", comment: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate("/")} className="text-gray-500 hover:text-red-600 transition">
              Home
            </button>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900 font-semibold">Contact</span>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <div className="inline-block bg-red-600/20 backdrop-blur rounded-full px-4 py-1 mb-4">
            <span className="text-red-400 text-sm font-bold uppercase tracking-wider">📞 Get in Touch</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">CONTACT US</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a question or comment? We'd love to hear from you!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 font-semibold">✓ Thank you for reaching out! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="hello@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2">Your Message / Comment *</label>
                <textarea
                  name="comment"
                  required
                  rows="4"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                  placeholder="Tell us about your order, customization request, or any questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg shadow-red-600/30"
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* Right Side - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <h3 className="text-xl font-black text-gray-900">Email Us</h3>
              </div>
              <a href="mailto:YOUR_EMAIL@gmail.com" className="text-red-600 font-semibold text-lg hover:underline break-all">
                YOUR_EMAIL@gmail.com
              </a>
              <p className="text-gray-500 text-sm mt-2">We reply within 24 hours</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📞</span>
                </div>
                <h3 className="text-xl font-black text-gray-900">Call / WhatsApp</h3>
              </div>
              <a href="tel:+91XXXXXXXXXX" className="text-blue-600 font-semibold text-lg hover:underline">
                +91 XXXXXXXXXX
              </a>
              <p className="text-gray-500 text-sm mt-2">Mon-Sat: 9:00 AM - 8:00 PM</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className="text-xl font-black text-gray-900">Visit Us</h3>
              </div>
              <p className="text-gray-700 font-medium">New Delhi, India</p>
              <p className="text-gray-500 text-sm mt-2">Online store - Shipping across India</p>
            </div>

            {/* Social Links - FIXED: Added actual links */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-black text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/yourstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-white text-xl">📷</span>
                </a>
                <a
                  href="https://twitter.com/yourstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-white text-xl">🐦</span>
                </a>
                <a
                  href="https://facebook.com/yourstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-white text-xl">📘</span>
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span>🕐</span> Opening Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Saturday</span>
                  <span className="font-semibold">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-red-400 font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip - FIXED: Removed href="#" */}
      <div className="bg-gray-900 text-gray-400 text-center py-6 text-sm mt-12">
        <p>© 2025 AnimeStore — Premium Posters Delivered Across India</p>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <button onClick={() => navigate("/privacy")} className="hover:text-white transition">
            Privacy Policy
          </button>
          <button onClick={() => navigate("/terms")} className="hover:text-white transition">
            Terms of Service
          </button>
          <button onClick={() => navigate("/contact")} className="hover:text-white transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;