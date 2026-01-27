// // src/components/ServicesPage.jsx
// import { useState } from 'react';

// const ServicesPage = () => {
//   const [selectedService, setSelectedService] = useState(null);

//   const services = [
//     {
//       id: 1,
//       title: "Diving Services",
//       image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
//       items: [
//         "Onshore Diving",
//         "Offshore Diving",
//         "Diving Training",
//         "Subsea Engineering & ROV Support"
//       ],
//       description: "We provide expert commercial diving solutions for both onshore and offshore operations, backed by a team trained to work in high-risk environments. Our services include inspection, maintenance, and repair work below waterline, supported by modern ROV technology and certified training programs."
//     },
//     {
//       id: 2,
//       title: "Marine & Civil Construction",
//       image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
//       items: [
//         "Shipping, Marine & Civil Construction",
//         "Aluminium & Steel Shipbuilding",
//         "Outfit Installations"
//       ],
//       description: "With experience across complex maritime and infrastructure projects, we execute end-to-end marine and civil construction, ensuring timely delivery with high engineering standards. Our shipbuilding capability covers both aluminium and steel vessels, outfit integrations, and retrofitting."
//     },
//     {
//       id: 3,
//       title: "Marine Engineering & Propulsion",
//       image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
//       items: [
//         "Propulsion Services",
//         "Marine Engine & Associated System Installation and Repair",
//         "Mechanical Repairs",
//         "Electrical & Automation"
//       ],
//       description: "From propulsion to power management, we offer turnkey marine engineering services. Our expertise includes engine installations, system overhauls, mechanical maintenance, and electrical automation tailored to the maritime industry."
//     },
//     {
//       id: 4,
//       title: "Fabrication & Maintenance",
//       image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800",
//       items: [
//         "Welding & Fabrication (Hull & Outfit)",
//         "Pipe Fabrication & Installation",
//         "Hull Treatment & Tank Cleaning",
//         "Machining Services"
//       ],
//       description: "We support vessel lifecycle needs with advanced fabrication capabilities. Our services include precision machining, structural welding, pipe installations, and hull/tank treatment for improved longevity and performance."
//     },
//     {
//       id: 5,
//       title: "Support Services",
//       image: "https://images.unsplash.com/photo-1621544402532-6d8555e1d8f8?w=800",
//       items: [
//         "Manpower Supply",
//         "Diving Equipment Rental"
//       ],
//       description: "To ensure seamless project execution, we offer skilled manpower solutions and reliable diving equipment rentals. Every resource provided adheres to industry safety and operational standards."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
//       <div className="container mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16 animate-fade-in">
//           <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
//             Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Services</span>
//           </h1>
//           <p className="text-blue-200 text-lg max-w-2xl mx-auto">
//             Comprehensive marine solutions tailored to meet your specific needs
//           </p>
//         </div>

//         {/* Services Grid */}
//         {!selectedService ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//             {services.map((service) => (
//               <div
//                 key={service.id}
//                 onClick={() => setSelectedService(service)}
//                 className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
//               >
//                 {/* Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   <img 
//                     src={service.image} 
//                     alt={service.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
//                 </div>

//                 {/* Title */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                   <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
//                     {service.title}
//                   </h3>
//                   <p className="text-blue-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     Click to learn more →
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* Expanded Service View */
//           <div className="max-w-5xl mx-auto animate-fade-in">
//             {/* Back Button */}
//             <button
//               onClick={() => setSelectedService(null)}
//               className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8 group"
//             >
//               <svg className="w-6 h-6 mr-2 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back to Services
//             </button>

//             {/* Service Detail Card */}
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Image */}
//                 <div className="relative h-96 md:h-auto">
//                   <img 
//                     src={selectedService.image} 
//                     alt={selectedService.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent"></div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-8">
//                   <h2 className="text-4xl font-bold text-white mb-6">
//                     {selectedService.title}
//                   </h2>

//                   {/* Service Items */}
//                   <div className="mb-6">
//                     <h3 className="text-xl font-semibold text-cyan-400 mb-4">What We Offer</h3>
//                     <ul className="space-y-3">
//                       {selectedService.items.map((item, index) => (
//                         <li key={index} className="text-blue-100 flex items-start">
//                           <span className="text-cyan-400 mr-3 text-xl">▸</span>
//                           <span className="leading-relaxed">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Description */}
//                   <div className="pt-6 border-t border-blue-500/30">
//                     <p className="text-blue-100 leading-relaxed">
//                       {selectedService.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ServicesPage;


// src/components/ServicesPage.jsx
import { useState } from 'react';
import servicesBackground from '/backgrounds/services.jpg';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Diving Services",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      items: [
        "Onshore Diving",
        "Offshore Diving",
        "Diving Training",
        "Subsea Engineering & ROV Support"
      ],
      description: "We provide expert commercial diving solutions for both onshore and offshore operations, backed by a team trained to work in high-risk environments. Our services include inspection, maintenance, and repair work below waterline, supported by modern ROV technology and certified training programs."
    },
    {
      id: 2,
      title: "Marine & Civil Construction",
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
      items: [
        "Shipping, Marine & Civil Construction",
        "Aluminium & Steel Shipbuilding",
        "Outfit Installations"
      ],
      description: "With experience across complex maritime and infrastructure projects, we execute end-to-end marine and civil construction, ensuring timely delivery with high engineering standards. Our shipbuilding capability covers both aluminium and steel vessels, outfit integrations, and retrofitting."
    },
    {
      id: 3,
      title: "Marine Engineering & Propulsion",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
      items: [
        "Propulsion Services",
        "Marine Engine & Associated System Installation and Repair",
        "Mechanical Repairs",
        "Electrical & Automation"
      ],
      description: "From propulsion to power management, we offer turnkey marine engineering services. Our expertise includes engine installations, system overhauls, mechanical maintenance, and electrical automation tailored to the maritime industry."
    },
    {
      id: 4,
      title: "Fabrication & Maintenance",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800",
      items: [
        "Welding & Fabrication (Hull & Outfit)",
        "Pipe Fabrication & Installation",
        "Hull Treatment & Tank Cleaning",
        "Machining Services"
      ],
      description: "We support vessel lifecycle needs with advanced fabrication capabilities. Our services include precision machining, structural welding, pipe installations, and hull/tank treatment for improved longevity and performance."
    },
    {
      id: 5,
      title: "Support Services",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      items: [
        "Manpower Supply",
        "Diving Equipment Rental"
      ],
      description: "To ensure seamless project execution, we offer skilled manpower solutions and reliable diving equipment rentals. Every resource provided adheres to industry safety and operational standards."
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${servicesBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700/80 via-blue-950/85 to-slate-700/90"></div>
        {/* Additional overlay for depth */}
        {/* <div className="absolute inset-0 bg-slate-900/30"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Services</span>
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Comprehensive marine solutions tailored to meet your specific needs
            </p>
          </div>

          {/* Services Grid */}
          {!selectedService ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group relative bg-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-500/20 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-blue-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                      Click to learn more 
                      <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </div>

                  {/* Item Count Badge */}
                  <div className="absolute top-4 right-4 bg-cyan-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {service.items.length} Services
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Expanded Service View */
            <div className="max-w-5xl mx-auto animate-fade-in">
              {/* Back Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8 group bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 hover:border-cyan-500/50"
              >
                <svg className="w-6 h-6 mr-2 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Services
              </button>

              {/* Service Detail Card */}
              <div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-96 md:h-auto">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent"></div>
                    
                    {/* Floating Service Number */}
                    <div className="absolute top-6 left-6 w-16 h-16 bg-cyan-500/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                      {selectedService.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-4xl font-bold text-white mb-6">
                      {selectedService.title}
                    </h2>

                    {/* Service Items */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        What We Offer
                      </h3>
                      <ul className="space-y-3">
                        {selectedService.items.map((item, index) => (
                          <li key={index} className="text-blue-100 flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                            <span className="text-cyan-400 mr-3 text-xl flex-shrink-0">▸</span>
                            <span className="leading-relaxed group-hover/item:text-white transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Description */}
                    <div className="pt-6 border-t border-blue-500/30">
                      <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Overview
                      </h3>
                      <p className="text-blue-100 leading-relaxed">
                        {selectedService.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8">
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <span>Get a Quote</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Why Choose Us Section */}
          {!selectedService && (
            <div className="mt-20 max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Our Services
                </span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Expert Team",
                    description: "Highly skilled professionals with years of maritime industry experience",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Quality Standards",
                    description: "All work adheres to international maritime safety and quality standards",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                  },
                  {
                    title: "On-Time Delivery",
                    description: "Committed to meeting project deadlines without compromising quality",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;