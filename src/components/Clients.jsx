// src/components/Clients.jsx
import { useEffect, useRef } from 'react';

const Clients = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const clientsRow1 = [
    { name: "L&T Shipbuilding", logo: "/clientlogo/LT-Shipbuilding.png" },
    { name: "Indian Coast Guard", logo: "/clientlogo/indiancoastguard.avif" },
    { name: "Johnson Controls", logo: "/clientlogo/johnsoncontrols.png" },
    { name: "Garden Reach Shipbuilders", logo: "/clientlogo/grse.jpg" },
    { name: "Ocean Sparkle Limited", logo: "/clientlogo/Ocean-Sparkle-Limited.jpg" },
    { name: "Kongsberg", logo: "/clientlogo/kongsberg-digital.png" },
    { name: "Chowgule SBD", logo: "/clientlogo/chowglue.jpeg" },
    { name: "Indian Navy", logo: "/clientlogo/indiannavyusnavy.png" },
    { name: "Solas Marine", logo: "/clientlogo/solas.jpg" },
    { name: "Gmmco CAT", logo: "/clientlogo/gmmco.png" }
  ];

  const clientsRow2 = [
    { name: "Cochin Shipyard", logo: "/clientlogo/cochin-shipyard.jpg" },
    { name: "MSC Kreuzfahrten", logo: "/clientlogo/msc.jpg" },
    { name: "WSPL", logo: "/clientlogo/wspl.png" },
    { name: "Mazagon Dock", logo: "/clientlogo/naval-ship-karwar.png" },
    { name: "UDUPI", logo: "/clientlogo/udupi.jpeg" },
    { name: "L&T Defence", logo: "/clientlogo/LTdefence.jpg" },
    { name: "Hindustan Shipyard", logo: "/clientlogo/hsl.jpg" },
    { name: "Adani Ports", logo: "/clientlogo/Adani-Port-Container-Tracking.webp" },
    { name: "USS Salvor", logo: "/clientlogo/USS_Salvor.jpg" }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Our <span className="text-blue-700">Clients</span>
          </h2>
          <div className="w-20 h-0.5 bg-blue-600 mx-auto mt-6"></div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-8 font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Trusted partnerships with leading organizations
          </p>
        </div>

        {/* Infinite Scrolling Row 1 - Left to Right */}
        <div className="relative mb-12 overflow-hidden">
          <div className="flex gap-12 animate-scroll-left">
            {[...clientsRow1, ...clientsRow1].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-32 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex items-center justify-center group hover:scale-110 border border-slate-200"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Scrolling Row 2 - Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-scroll-right">
            {[...clientsRow2, ...clientsRow2].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-32 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex items-center justify-center group hover:scale-110 border border-slate-200"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              50<span className="text-blue-500">+</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Active Clients
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              500<span className="text-blue-500">+</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Projects Delivered
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              15<span className="text-blue-500">+</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Years Experience
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              100<span className="text-blue-500">%</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Clients;