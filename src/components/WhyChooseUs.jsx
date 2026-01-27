// // src/components/WhyChooseUs.jsx
// import { useEffect, useState, useRef } from 'react';
// import CLOUDS from 'vanta/dist/vanta.clouds.min';
// import * as THREE from 'three';

// const WhyChooseUs = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const vantaRef = useRef(null);
//   const vantaEffect = useRef(null);

//   // Intersection Observer for scroll animation
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const section = document.getElementById('why-choose-us');
//     if (section) observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   // Vanta.js initialization
//   useEffect(() => {
//     if (!vantaEffect.current && vantaRef.current) {
//       vantaEffect.current = CLOUDS({
//         el: vantaRef.current,
//         THREE: THREE,
//         mouseControls: true,
//         touchControls: true,
//         gyroControls: false,
//         minHeight: 200.00,
//         minWidth: 200.00,
//         skyColor: 0x2a86b6,
//         cloudColor: 0x94a5b8,
//         cloudShadowColor: 0x183550,
//         sunColor: 0xff9919,
//         sunGlareColor: 0xff6633,
//         sunlightColor: 0xff9933,
//         speed: 0.8
//       });
//     }

//     return () => {
//       if (vantaEffect.current) {
//         vantaEffect.current.destroy();
//       }
//     };
//   }, []);

//   const points = [
//     "Trusted by leading shipyards across India.",
//     "Skilled, certified workforce with marine expertise.",
//     "ISO-certified systems ensuring quality & safety.",
//     "End-to-end shipbuilding and repair capabilities.",
//     "On-time delivery with reliable project execution."
//   ];

//   const features = [
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Our Vision",
//       description: "To deliver top-quality shipbuilding, repair, and marine engineering services with unmatched precision and reliability."
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//       title: "Our Mission",
//       description: "To be the leading marine solutions provider in South India, driving quality and innovation in every project."
//     }
//   ];

//   return (
//     <section 
//       id="why-choose-us"
//       className="relative py-24 overflow-hidden"
//     >
//       {/* Vanta.js Background */}
//       <div 
//         ref={vantaRef} 
//         className="absolute inset-0"
//         style={{ zIndex: 0 }}
//       />

//       {/* Gradient overlay for better text readability */}
//       <div 
//         className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" 
//         style={{ zIndex: 1 }}
//       />

//       <div 
//         className={`container mx-auto px-6 relative transition-all duration-1000 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}
//         style={{ zIndex: 2 }}
//       >
//         {/* Section Header */}
//         <div className="text-center mb-20">
//           <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-lg">
//             Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Us?</span>
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-6 rounded-full"></div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
//           {/* Left Side - Key Points */}
//           <div className="space-y-5">
//             <h3 className="text-2xl font-semibold text-cyan-400 mb-8 text-center lg:text-left drop-shadow-md">
//               Our Strengths
//             </h3>
//             {points.map((point, index) => (
//               <div 
//                 key={index}
//                 className="flex items-start gap-5 bg-slate-800/60 backdrop-blur-md p-5 rounded-xl border border-blue-500/30 hover:border-cyan-500/60 transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/80 group shadow-lg"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
//                   {index + 1}
//                 </div>
//                 <p className="text-blue-50 leading-relaxed pt-2 text-lg drop-shadow">
//                   {point}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Right Side - Vision & Mission */}
//           <div className="space-y-8">
//             <h3 className="text-2xl font-semibold text-cyan-400 mb-8 text-center lg:text-left drop-shadow-md">
//               Our Direction
//             </h3>
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="bg-gradient-to-br from-slate-800/70 to-blue-950/50 backdrop-blur-md p-8 rounded-2xl border border-blue-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-2 group shadow-xl"
//               >
//                 <div className="flex items-start gap-6">
//                   <div className="flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform drop-shadow-lg">
//                     {feature.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors drop-shadow-md">
//                       {feature.title}
//                     </h3>
//                     <p className="text-blue-100 leading-relaxed text-lg drop-shadow">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;


// src/components/WhyChooseUs.jsx
import { useEffect, useState, useRef } from 'react';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import * as THREE from 'three';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('why-choose-us');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Vanta.js initialization
  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x2a86b6,
        cloudColor: 0x94a5b8,
        cloudShadowColor: 0x183550,
        sunColor: 0xff9919,
        sunGlareColor: 0xff6633,
        sunlightColor: 0xff9933,
        speed: 0.8
      });
    }


    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  const points = [
    "Trusted by leading shipyards across India.",
    "Skilled, certified workforce with marine expertise.",
    "ISO-certified systems ensuring quality & safety.",
    "End-to-end shipbuilding and repair capabilities.",
    "On-time delivery with reliable project execution."
  ];

  const features = [
    {
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Our Vision",
      description: "To deliver top-quality shipbuilding, repair, and marine engineering services with unmatched precision and reliability."
    },
    {
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Our Mission",
      description: "To be the leading marine solutions provider in South India, driving quality and innovation in every project."
    }
  ];

  return (
    <section 
      id="why-choose-us"
      className="relative py-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Vanta.js Background */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      {/* Light overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-white/5" 
        style={{ zIndex: 1 }}
      />

      <div 
        className={`container mx-auto px-6 relative transition-all duration-1000 w-full ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ zIndex: 2 }}
      >
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Why Choose <span className="font-normal text-blue-200">Us</span><span className="text-blue-200">?</span>
          </h2>
          <div className="w-20 h-0.5 bg-blue-300 mx-auto mt-8"></div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side - Key Points */}
          <div className="space-y-6">
            <h3 className="text-3xl font-light text-blue-900 mb-12 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Our Strengths
            </h3>
            {points.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-6 group transition-all duration-300 hover:translate-x-2"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-400/80 backdrop-blur-sm flex items-center justify-center text-white font-light text-xl shadow-lg group-hover:bg-blue-500/90 transition-all">
                  {index + 1}
                </div>
                <p className="text-slate-800 leading-relaxed pt-2.5 text-lg font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Vision & Mission */}
          <div className="space-y-12">
            <h3 className="text-3xl font-light text-blue-900 mb-12 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Our Direction
            </h3>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 text-blue-700 bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-all">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-3xl font-light text-slate-900 mb-5 tracking-wide group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                      {feature.title}
                    </h4>
                    <p className="text-slate-800 leading-relaxed text-lg font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;