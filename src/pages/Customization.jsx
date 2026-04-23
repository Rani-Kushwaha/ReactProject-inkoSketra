import { useNavigate } from "react-router-dom";

const Customization = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate("/")} className="text-gray-500 hover:text-red-600 transition">
              Home
            </button>
            <span className="text-gray-400"></span>
            <span className="text-gray-900 font-semibold">Customization</span>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <div className="inline-block bg-purple-600/20 backdrop-blur rounded-full px-4 py-1 mb-4">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">🎨 Create Your Own</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">CUSTOM ORDER</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get personalized posters with your favorite images - anime, family photos, football, or anything you love!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        
        {/* Custom Order CTA Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 mb-12 text-center text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-5xl mb-2 block">🎨✨</span>
              <h2 className="text-2xl md:text-3xl font-black">Want Something Unique?</h2>
              <p className="text-white/80 mt-1">Contact us on Instagram or WhatsApp for custom orders!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://instagram.com/YOUR_INSTA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <span className="text-2xl">📷</span> Instagram
              </a>
              <a 
                href="https://wa.me/91XXXXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg"
              >
                <span className="text-2xl">💚</span> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* What you can customize */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🖼️</span> What Can You Customize?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { emoji: "🎬", text: "Anime Characters" },
                  { emoji: "🏏", text: "Cricket Moments" },
                  { emoji: "⚽", text: "Football Stars" },
                  { emoji: "🏎️", text: "Supercars" },
                  { emoji: "👨‍👩‍👧", text: "Family Photos" },
                  { emoji: "🐱", text: "Pet Photos" },
                  { emoji: "🎸", text: "Music Artists" },
                  { emoji: "💪", text: "Motivational Quotes" },
                ].map((item) => (
                  <div key={item.text} className="bg-gray-50 rounded-xl p-3 text-center hover:bg-purple-50 transition">
                    <span className="text-2xl block mb-1">{item.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  💡 <span className="font-bold">No extra charges for customization!</span> Prices are same as mentioned on the website.
                </p>
              </div>
            </div>

            {/* How to Order */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📋</span> How to Place a Custom Order
              </h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Share Your Image", desc: "Send us the link of the image or mail us at YOUR_EMAIL@gmail.com. You can provide any image you want - family photos, anime, football, etc." },
                  { step: 2, title: "Confirm Design", desc: "We'll create a preview and share it with you for approval before production." },
                  { step: 3, title: "Make Advance Payment", desc: "30% advance payment is required to start production." },
                  { step: 4, title: "Final Payment & Dispatch", desc: "Once your product is ready, we'll send you images. Pay remaining amount and we'll dispatch immediately." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-black text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Terms & Conditions */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Terms & Conditions
              </h2>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-red-400 font-bold">❌ No COD</p>
                  <p className="text-gray-300 text-sm">Cash on Delivery not available for custom orders</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-yellow-400 font-bold">💰 30% Advance Payment</p>
                  <p className="text-gray-300 text-sm">Remaining amount to be paid when product is completely ready to dispatch</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-blue-400 font-bold">📸 Quality Check</p>
                  <p className="text-gray-300 text-sm">We'll send you images of your product once ready, then you can pay remaining amount</p>
                </div>
                <div>
                  <p className="text-red-400 font-bold">🚫 No Cancellation Policy</p>
                  <p className="text-gray-300 text-sm">Once your order has been processed, cancellation is not available. 30% advance is non-refundable.</p>
                </div>
              </div>
            </div>

            {/* Contact for Custom Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-200">
              <h3 className="font-black text-gray-900 mb-3 text-center">📞 Quick Contact for Custom Orders</h3>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/91XXXXXXXXXX" 
                  className="flex items-center justify-between bg-green-50 p-3 rounded-xl hover:bg-green-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">💚</span>
                    <span className="font-semibold text-gray-700">WhatsApp</span>
                  </span>
                  <span className="text-green-600 font-bold">+91 XXXXXXXXXX</span>
                </a>
                <a 
                  href="https://instagram.com/YOUR_INSTA" 
                  className="flex items-center justify-between bg-pink-50 p-3 rounded-xl hover:bg-pink-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">📷</span>
                    <span className="font-semibold text-gray-700">Instagram</span>
                  </span>
                  <span className="text-pink-600 font-bold">@YOUR_INSTA</span>
                </a>
                <a 
                  href="mailto:YOUR_EMAIL@gmail.com" 
                  className="flex items-center justify-between bg-red-50 p-3 rounded-xl hover:bg-red-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">📧</span>
                    <span className="font-semibold text-gray-700">Email</span>
                  </span>
                  <span className="text-red-600 font-bold text-sm">YOUR_EMAIL@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Note Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-sm font-medium">
                📌 <span className="font-bold">Note:</span> There is no cancellation once your order has been processed. 
                If you still wish to cancel, the 30% advance taken earlier will not be refunded.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip matching Home page */}
      <div className="bg-gray-900 text-gray-400 text-center py-6 text-sm mt-12">
        <p>© 2025 AnimeStore — Premium Posters Delivered Across India</p>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition">Terms of Service</a>
          <a href="/contact" className="hover:text-white transition">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Customization;