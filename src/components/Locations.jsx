// src/components/Locations.jsx
import { useState } from 'react';

const Locations = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const locations = [
    {
      name: "KOCHI OFFICE",
      address: "FIDA TOWER, KK PADMANABHAN ROAD, ERNAKULAM NORTH, 682018",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=FIDA+TOWER+KK+PADMANABHAN+ROAD+ERNAKULAM+NORTH+682018",
      position: { top: '134px', left: '140px' }, // Adjust based on your image
      color: "from-cyan-500 to-blue-500"
    },
    {
      name: "CHENNAI OFFICE",
      address: "71, L&T SHIPBUILDING, KATTUPALLI, TAMIL NADU 600120",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=71+L%26T+SHIPBUILDING+KATTUPALLI+TAMIL+NADU+600120",
      position: { top: '280px', left: '-85px' },
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "MANGLORE BRANCH",
      address: "CSBD, KASBA BENGRE, MANGALURU, KARNATAKA 575001",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=CSBD+KASBA+BENGRE+MANGALURU+KARNATAKA+575001",
      position: { top: '20px', left: '625px' },
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "VIZAG BRANCH",
      address: "SITE OFFICE, HINDUSTAN SHIPYARD, VISAKHAPATNAM, ANDHRA PRADESH 530005",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=HINDUSTAN+SHIPYARD+VISAKHAPATNAM+ANDHRA+PRADESH+530005",
      position: { top: '130px', left: '1020px' },
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "OVERSEAS BRANCH",
      address: "6A, LUMBARE AVE, KAMPALA, UGANDA",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=6A+LUMBARE+AVE+KAMPALA+UGANDA",
      position: { top: '250px', left: '1320px' },
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/awlogo/location.webp')",
          }}
        />
        {/* Overlay for better pin visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 py-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">LOCATIONS</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-blue-200 text-xl">
            Serving clients across India and internationally
          </p>
        </div>

        {/* Interactive Map with Pins */}
        <div className="max-w-6xl mx-auto relative" style={{ minHeight: '500px' }}>
          
          {/* Location Pins */}
          {locations.map((location, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-full"
              style={{ 
                top: location.position.top, 
                left: location.position.left 
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Pin */}
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block cursor-pointer group"
              >
                {/* Animated Pulse Ring */}
                <div className={`absolute -top-2 -left-2 w-16 h-16 rounded-full bg-gradient-to-r ${location.color} opacity-0 group-hover:opacity-30 animate-ping`} />
                
                {/* Pin Icon */}
                <div className={`relative w-12 h-12 transition-all duration-300 ${
                  hoveredIndex === index ? 'scale-125' : 'scale-100'
                }`}>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-full h-full drop-shadow-2xl"
                  >
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                      className={`fill-current transition-all duration-300 ${
                        hoveredIndex === index 
                          ? 'text-cyan-400' 
                          : 'text-blue-500'
                      }`}
                      stroke="white"
                      strokeWidth="1"
                    />
                    <circle 
                      cx="12" 
                      cy="9" 
                      r="2.5" 
                      fill="white"
                    />
                  </svg>
                </div>

                {/* Info Card - Shows on Hover */}
                <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                  <div className={`bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-6 rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30`}>
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-t-2 border-l-2 border-cyan-400/50 transform rotate-45" />
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 text-center">
                      {location.name}
                    </h3>
                    <p className="text-blue-200 text-sm text-center leading-relaxed mb-4">
                      {location.address}
                    </p>
                    
                    {/* View Map Button */}
                    <div className="flex items-center justify-center gap-2 text-cyan-400 font-semibold text-sm">
                      <span>View on Google Maps</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}

        </div>

        {/* Coverage Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-xl px-8 py-5 rounded-full border border-cyan-500/40 shadow-xl shadow-cyan-500/20">
            <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-cyan-400 font-bold text-lg">
              5 Strategic Locations | Pan-India & International Presence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;