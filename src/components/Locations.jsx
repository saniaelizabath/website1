// src/components/Locations.jsx
const Locations = () => {
  const locations = [
    {
      name: "KOCHI OFFICE",
      address: "FIDA TOWER, KK PADMANABHAN ROAD, ERNAKULAM NORTH, 682018",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=FIDA+TOWER+KK+PADMANABHAN+ROAD+ERNAKULAM+NORTH+682018",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "from-cyan-500 to-blue-500"
    },
    {
      name: "CHENNAI OFFICE",
      address: "71, L&T SHIPBUILDING, KATTUPALLI, TAMIL NADU 600120",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=71+L%26T+SHIPBUILDING+KATTUPALLI+TAMIL+NADU+600120",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "MANGLORE BRANCH",
      address: "CSBD, KASBA BENGRE, MANGALURU, KARNATAKA 575001",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=CSBD+KASBA+BENGRE+MANGALURU+KARNATAKA+575001",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "VIZAG BRANCH",
      address: "SITE OFFICE, HINDUSTAN SHIPYARD, VISAKHAPATNAM, ANDHRA PRADESH 530005",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=HINDUSTAN+SHIPYARD+VISAKHAPATNAM+ANDHRA+PRADESH+530005",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "OVERSEAS BRANCH",
      address: "6A, LUMBARE AVE, KAMPALA, UGANDA",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=6A+LUMBARE+AVE+KAMPALA+UGANDA",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 to-blue-950 overflow-hidden">
      {/* Background Map Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2306b6d4' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">LOCATIONS</span>
          </h2>
          <p className="text-blue-200 text-lg">
            Serving clients across India and internationally
          </p>
        </div>

        {/* Locations Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <a
              key={index}
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3 cursor-pointer"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-br ${location.color} text-white group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {location.icon}
                </div>
              </div>

              {/* Location Name */}
              <h3 className="text-xl font-bold text-white text-center mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {location.name}
              </h3>

              {/* Address */}
              <p className="text-blue-200 text-center text-sm leading-relaxed mb-6">
                {location.address}
              </p>

              {/* View on Map Button */}
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all duration-300">
                <span>View on Map</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${location.color} opacity-20 rounded-bl-full`}></div>
              </div>
            </a>
          ))}
        </div>

        {/* Coverage Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm px-8 py-4 rounded-full border border-cyan-500/30">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-cyan-400 font-semibold">
              5 Strategic Locations | Pan-India & International Presence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;