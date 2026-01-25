// src/components/Clients.jsx
const Clients = () => {
  const clients = [
    { name: "L&T Shipbuilding", logo: "https://via.placeholder.com/150x80/1e3a8a/60a5fa?text=L%26T" },
    { name: "Indian Coast Guard", logo: "https://via.placeholder.com/150x80/0891b2/06b6d4?text=Coast+Guard" },
    { name: "Johnson Controls", logo: "https://via.placeholder.com/150x80/1e40af/3b82f6?text=Johnson" },
    { name: "Garden Reach Shipbuilders", logo: "https://via.placeholder.com/150x80/0369a1/0ea5e9?text=GRSE" },
    { name: "Ocean Sparkle Limited", logo: "https://via.placeholder.com/150x80/075985/0284c7?text=Ocean+Sparkle" },
    { name: "Kongsberg", logo: "https://via.placeholder.com/150x80/dc2626/ef4444?text=Kongsberg" },
    { name: "Chowgule SBD", logo: "https://via.placeholder.com/150x80/1e3a8a/60a5fa?text=Chowgule" },
    { name: "Indian Navy", logo: "https://via.placeholder.com/150x80/0891b2/06b6d4?text=Indian+Navy" },
    { name: "Solas Marine", logo: "https://via.placeholder.com/150x80/1e40af/3b82f6?text=Solas" },
    { name: "Gmmco CAT", logo: "https://via.placeholder.com/150x80/f59e0b/fbbf24?text=CAT" },
    { name: "Cochin Shipyard", logo: "https://via.placeholder.com/150x80/0369a1/0ea5e9?text=Cochin+SY" },
    { name: "MSC Kreuzfahrten", logo: "https://via.placeholder.com/150x80/075985/0284c7?text=MSC" },
    { name: "WSPL", logo: "https://via.placeholder.com/150x80/dc2626/ef4444?text=WSPL" },
    { name: "Mazagon Dock", logo: "https://via.placeholder.com/150x80/1e3a8a/60a5fa?text=Mazagon" },
    { name: "BEML", logo: "https://via.placeholder.com/150x80/0891b2/06b6d4?text=BEML" },
    { name: "L&T Defence", logo: "https://via.placeholder.com/150x80/1e40af/3b82f6?text=L%26T+Defence" },
    { name: "Hindustan Shipyard", logo: "https://via.placeholder.com/150x80/0369a1/0ea5e9?text=HSL" },
    { name: "Adani Ports", logo: "https://via.placeholder.com/150x80/075985/0284c7?text=Adani" },
    { name: "Naval Ship Repair Yard", logo: "https://via.placeholder.com/150x80/dc2626/ef4444?text=NSRY" }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-950 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">CLIENTS</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Trusted by leading organizations in the marine and defense sectors across India
          </p>
        </div>

        {/* Clients Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 flex items-center justify-center aspect-video"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeIn 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Logo */}
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent rounded-xl transition-all duration-500"></div>

                {/* Client Name Tooltip */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-slate-800 text-cyan-400 text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                    {client.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              50+
            </div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">
              Active Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              500+
            </div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">
              Projects Delivered
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              15+
            </div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              100%
            </div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Clients;