// // src/components/AboutUsPage.jsx
// import { useState } from "react";
// import founderImage from "/backgrounds/ceo.jpeg";

// const AboutUsPage = () => {
//   // Import all images from /aboutus folder
//   // Note: You'll need to import these based on your actual image files
//   const galleryImages = [
//     "/aboutus/image1.jpg",
//     "/aboutus/image2.jpg",
//     "/aboutus/image3.jpg",
//     "/aboutus/image4.jpg",
//     "/aboutus/image5.jpg",
//     "/aboutus/image6.jpg",
//     "/aboutus/image7.jpg",
//     "/aboutus/image8.jpg",
//   ];

//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
//       <div className="container mx-auto px-6">
        
//         {/* Page Header */}
//         <div className="text-center mb-16 animate-fade-in">
//           <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
//             About{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//               Mag Marine
//             </span>
//           </h1>
//           <p className="text-blue-200 text-lg max-w-3xl mx-auto">
//             Building India's marine engineering future with discipline, technical excellence, and commitment
//           </p>
//         </div>

//         {/* Founder's Vision Section */}
//         <div className="max-w-7xl mx-auto mb-20">
//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl">
            
//             {/* Section Title */}
//             <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/20 px-8 py-6">
//               <h2 className="text-3xl font-bold text-white flex items-center gap-3">
//                 <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//                 Founder's Vision
//               </h2>
//             </div>

//             <div className="p-8 md:p-12">
//               <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                
//                 {/* Founder Image */}
//                 <div className="md:col-span-2">
//                   <div className="relative group">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
//                     <div className="relative">
//                       <img
//                         src={founderImage}
//                         alt="Hrishikesh M Anilkumar - Founder & Managing Director"
//                         className="w-full rounded-2xl shadow-2xl border-4 border-slate-700/50"
//                       />
//                       <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
//                     </div>
//                   </div>
                  
//                   {/* Founder Info Card */}
//                   <div className="mt-6 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center">
//                     <h3 className="text-2xl font-bold text-white mb-2">
//                       Hrishikesh M Anilkumar
//                     </h3>
//                     <p className="text-cyan-400 font-semibold mb-1">
//                       Founder & Managing Director
//                     </p>
//                     <p className="text-blue-300 text-sm">
//                       Mag Marine Services Private Limited
//                     </p>
//                   </div>
//                 </div>

//                 {/* Vision Content */}
//                 <div className="md:col-span-3 space-y-6">
//                   <div className="space-y-5 text-blue-100 leading-relaxed">
//                     <p className="text-lg">
//                       Mag Marine was founded with a clear belief — that the marine engineering sector in India requires not just skilled execution, but <span className="text-cyan-400 font-semibold">structured leadership</span>, <span className="text-cyan-400 font-semibold">accountable systems</span>, and <span className="text-cyan-400 font-semibold">long-term institutional thinking</span>.
//                     </p>

//                     <p>
//                       Having worked closely within ship repair and shipbuilding environments, both in India and overseas, I witnessed firsthand the challenges caused by fragmented execution, lack of process discipline, and short-term contractor mindsets. Mag Marine was created to address these gaps and to build an organisation that operates with clarity, professionalism, and purpose.
//                     </p>

//                     {/* <p>
//                       My vision is to develop Mag Marine into a <span className="text-cyan-400 font-semibold">leading marine engineering organisation</span> that contributes meaningfully to India's defence and shipbuilding ecosystem. Every project we execute is treated as a step towards building scalable capability, strengthening systems, and earning long-term trust within the industry.
//                     </p> */}

//                     {/* <p>
//                       With India's growing focus on indigenous shipbuilding, defence self-reliance, and the Make in India initiative, I strongly believe this is a defining period for the marine sector. Mag Marine is being built to grow alongside this national transformation — with <span className="text-cyan-400 font-semibold">discipline</span>, <span className="text-cyan-400 font-semibold">technical excellence</span>, and a <span className="text-cyan-400 font-semibold">commitment to consistent execution</span>.
//                     </p> */}

//                     <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border-l-4 border-cyan-500 rounded-r-xl p-6 my-6">
//                       <p className="text-white font-semibold text-lg">
//                         Our objective is not short-term expansion, but sustained leadership — where reliability, safety, quality, and accountability define our identity.
//                       </p>
//                     </div>

//                     <p>
//                       Through structured growth, skilled teams, and strong governance, Mag Marine aims to become a trusted name in defence and commercial marine engineering, both in India and beyond.
//                     </p>
//                   </div>

//                   {/* Key Pillars */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//                     {[
//                       {  label: "Reliability" },
//                       {  label: "Safety" },
//                       {  label: "Quality" },
//                       {  label: "Accountability" },
//                     ].map((pillar, index) => (
//                       <div
//                         key={index}
//                         className="bg-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
//                       >
//                         <div className="text-3xl mb-2">{pillar.icon}</div>
//                         <div className="text-white font-semibold text-sm">{pillar.label}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Our Journey Section */}
//         <div className="max-w-7xl mx-auto mb-20">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Our{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//                 Journey
//               </span>
//             </h2>
//             <p className="text-blue-200 text-lg">
//               Explore our work, projects, and the Mag Marine story
//             </p>
//           </div>

//           {/* 3D Dome Gallery */}
//           <div className="relative" style={{ width: '100%', height: '600px' }}>
//             <DomeGallery images={galleryImages} onImageClick={setSelectedImage} />
//           </div>
//         </div>

//         {/* Company Values */}
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-white text-center mb-12">
//             Our{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//               Core Values
//             </span>
//           </h2>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 title: "Technical Excellence",
//                 description: "Delivering world-class marine engineering solutions with precision and expertise",
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 ),
//               },
//               {
//                 title: "Systematic Approach",
//                 description: "Building robust processes and systems for consistent, reliable project delivery",
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                   </svg>
//                 ),
//               },
//               {
//                 title: "Nation Building",
//                 description: "Contributing to India's defence self-reliance and maritime infrastructure growth",
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 ),
//               },
//             ].map((value, index) => (
//               <div
//                 key={index}
//                 className="bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 group"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
//                 <p className="text-blue-200 leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative max-w-6xl max-h-[90vh]">
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors"
//             >
//               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <img
//               src={selectedImage}
//               alt="Gallery"
//               className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
//             />
//           </div>
//         </div>
//       )}

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

// // 3D Dome Gallery Component
// const DomeGallery = ({ images, onImageClick }) => {
//   const [rotation, setRotation] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const delta = e.clientX - dragStart;
//       setRotation((prev) => prev + delta * 0.5);
//       setDragStart(e.clientX);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const segments = images.length;
//   const fit = 0.8;
//   const minRadius = 600;
//   const maxVerticalRotationDeg = 0;
//   const dragDampening = 2;

//   return (
//     <div
//       className="dome-gallery-container"
//       style={{
//         width: '100%',
//         height: '100%',
//         perspective: '1200px',
//         cursor: isDragging ? 'grabbing' : 'grab',
//         userSelect: 'none',
//       }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//     >
//       <div
//         className="dome-gallery"
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'relative',
//           transformStyle: 'preserve-3d',
//           transform: `rotateY(${rotation}deg) rotateX(-10deg)`,
//           transition: isDragging ? 'none' : 'transform 0.5s ease-out',
//         }}
//       >
//         {images.map((image, index) => {
//           const angle = (360 / segments) * index;
//           const radius = minRadius / fit;
//           const x = Math.sin((angle * Math.PI) / 180) * radius;
//           const z = Math.cos((angle * Math.PI) / 180) * radius;
          
//           return (
//             <div
//               key={index}
//               className="dome-gallery-item group"
//               style={{
//                 position: 'absolute',
//                 left: '50%',
//                 top: '50%',
//                 width: '280px',
//                 height: '200px',
//                 marginLeft: '-140px',
//                 marginTop: '-100px',
//                 transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
//                 transformStyle: 'preserve-3d',
//                 transition: 'all 0.3s ease',
//               }}
//               onClick={() => onImageClick(image)}
//             >
//               <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-500 group-hover:scale-110 transition-all duration-300 shadow-2xl">
//                 <img
//                   src={image}
//                   alt={`Gallery ${index + 1}`}
//                   className="w-full h-full object-cover"
//                   draggable={false}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   Click to view
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Navigation Hint */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30">
//         <span className="flex items-center gap-2">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
//           </svg>
//           Drag to rotate • Click to view
//         </span>
//       </div>
//     </div>
//   );
// };

// export default AboutUsPage;


// src/components/AboutUsPage.jsx
import { useState, useEffect } from "react";
import founderImage from "/backgrounds/ceo.jpeg";

const AboutUsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Automatically generate paths for all WhatsApp images
  // Adjust the range and naming pattern based on your actual files
  const generateImagePaths = () => {
    const images = [];
    
    // Pattern 1: WhatsApp Image 2026-01-26 at 5.52.XX
    for (let i = 1; i <= 35; i++) {
      const timestamp = String(i).padStart(2, '0');
      images.push(`/aboutus/WhatsApp Image 2026-01-26 at 5.52.${timestamp}.jpeg`);
    }
    
    // You can add more patterns if you have different naming conventions
    // Pattern 2: Example for different timestamps
    // for (let i = 1; i <= 10; i++) {
    //   images.push(`/aboutus/WhatsApp Image 2026-01-26 at 5.21.${String(i).padStart(2, '0')}.jpeg`);
    // }
    
    return images;
  };

  const galleryImages = generateImagePaths();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Mag Marine
            </span>
          </h1>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            Building India's marine engineering future with discipline, technical excellence, and commitment
          </p>
        </div>

        {/* Founder's Vision Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl">
            
            {/* Section Title */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/20 px-8 py-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Founder's Vision
              </h2>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                
                {/* Founder Image */}
                <div className="md:col-span-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative">
                      <img
                        src={founderImage}
                        alt="Hrishikesh M Anilkumar - Founder & Managing Director"
                        className="w-full rounded-2xl shadow-2xl border-4 border-slate-700/50"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Founder Info Card */}
                  <div className="mt-6 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Hrishikesh M Anilkumar
                    </h3>
                    <p className="text-cyan-400 font-semibold mb-1">
                      Founder & Managing Director
                    </p>
                    <p className="text-blue-300 text-sm">
                      Mag Marine Services Private Limited
                    </p>
                  </div>
                </div>

                {/* Vision Content */}
                <div className="md:col-span-3 space-y-6">
                  <div className="space-y-5 text-blue-100 leading-relaxed">
                    <p className="text-lg">
                      Mag Marine was founded with a clear belief — that the marine engineering sector in India requires not just skilled execution, but <span className="text-cyan-400 font-semibold">structured leadership</span>, <span className="text-cyan-400 font-semibold">accountable systems</span>, and <span className="text-cyan-400 font-semibold">long-term institutional thinking</span>.
                    </p>

                    <p>
                      Having worked closely within ship repair and shipbuilding environments, both in India and overseas, I witnessed firsthand the challenges caused by fragmented execution, lack of process discipline, and short-term contractor mindsets. Mag Marine was created to address these gaps and to build an organisation that operates with clarity, professionalism, and purpose.
                    </p>

                    <p>
                      My vision is to develop Mag Marine into a <span className="text-cyan-400 font-semibold">leading marine engineering organisation</span> that contributes meaningfully to India's defence and shipbuilding ecosystem. Every project we execute is treated as a step towards building scalable capability, strengthening systems, and earning long-term trust within the industry.
                    </p>

                    <p>
                      With India's growing focus on indigenous shipbuilding, defence self-reliance, and the Make in India initiative, I strongly believe this is a defining period for the marine sector. Mag Marine is being built to grow alongside this national transformation — with <span className="text-cyan-400 font-semibold">discipline</span>, <span className="text-cyan-400 font-semibold">technical excellence</span>, and a <span className="text-cyan-400 font-semibold">commitment to consistent execution</span>.
                    </p>

                    <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border-l-4 border-cyan-500 rounded-r-xl p-6 my-6">
                      <p className="text-white font-semibold text-lg">
                        Our objective is not short-term expansion, but sustained leadership — where reliability, safety, quality, and accountability define our identity.
                      </p>
                    </div>

                    <p>
                      Through structured growth, skilled teams, and strong governance, Mag Marine aims to become a trusted name in defence and commercial marine engineering, both in India and beyond.
                    </p>
                  </div>

                  {/* Key Pillars */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                      { icon: "🎯", label: "Reliability" },
                      { icon: "🛡️", label: "Safety" },
                      { icon: "⭐", label: "Quality" },
                      { icon: "✓", label: "Accountability" },
                    ].map((pillar, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
                      >
                        <div className="text-3xl mb-2">{pillar.icon}</div>
                        <div className="text-white font-semibold text-sm">{pillar.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Journey
              </span>
            </h2>
            <p className="text-blue-200 text-lg">
              Explore our work, projects, and the Mag Marine story
            </p>
          </div>

          {/* Floating Gallery with Smooth Animation */}
          <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-cyan-500/20 p-8 overflow-hidden" style={{ minHeight: '700px' }}>
            <FloatingGallery images={galleryImages} onImageClick={setSelectedImage} />
          </div>
        </div>

        {/* Company Values */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Core Values
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Technical Excellence",
                description: "Delivering world-class marine engineering solutions with precision and expertise",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Systematic Approach",
                description: "Building robust processes and systems for consistent, reliable project delivery",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
              },
              {
                title: "Nation Building",
                description: "Contributing to India's defence self-reliance and maritime infrastructure growth",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-blue-200 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors group"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-full p-2 group-hover:bg-slate-700/50 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            <div className="relative">
              <img
                src={selectedImage}
                alt="Gallery"
                className="max-w-full max-h-[90vh] rounded-xl shadow-2xl border-4 border-cyan-500/50"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>
        </div>
      )}

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

// Floating Gallery Component with Smooth Animations
const FloatingGallery = ({ images, onImageClick }) => {
  const [positions, setPositions] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  // Filter out images that don't exist
  useEffect(() => {
    const checkImages = async () => {
      const validImages = [];
      for (const img of images) {
        try {
          const response = await fetch(img, { method: 'HEAD' });
          if (response.ok) {
            validImages.push(img);
          }
        } catch (error) {
          // Image doesn't exist, skip it
        }
      }
      setLoadedImages(validImages);
    };
    
    checkImages();
  }, [images]);

  // Initialize random positions for each image
  useEffect(() => {
    if (loadedImages.length === 0) return;

    const newPositions = loadedImages.map((_, index) => ({
      x: 10 + (index * 70 / loadedImages.length) % 80, // Distribute across width
      y: 10 + (index * 60 / loadedImages.length) % 80, // Distribute across height
      rotation: Math.random() * 20 - 10, // -10 to 10 degrees
      scale: 0.85 + Math.random() * 0.3, // 0.85 to 1.15
      direction: {
        x: (Math.random() - 0.5) * 0.15, // Slower movement
        y: (Math.random() - 0.5) * 0.15,
      },
      delay: index * 0.05, // Stagger animation
    }));
    setPositions(newPositions);
  }, [loadedImages]);

  // Animate positions continuously
  useEffect(() => {
    if (positions.length === 0) return;

    const interval = setInterval(() => {
      setPositions(prev => 
        prev.map(pos => {
          let newX = pos.x + pos.direction.x;
          let newY = pos.y + pos.direction.y;
          let newDirectionX = pos.direction.x;
          let newDirectionY = pos.direction.y;

          // Bounce off edges
          if (newX <= 3 || newX >= 87) {
            newDirectionX = -pos.direction.x;
            newX = Math.max(3, Math.min(87, newX));
          }
          if (newY <= 3 || newY >= 87) {
            newDirectionY = -pos.direction.y;
            newY = Math.max(3, Math.min(87, newY));
          }

          return {
            ...pos,
            x: newX,
            y: newY,
            direction: {
              x: newDirectionX,
              y: newDirectionY,
            },
          };
        })
      );
    }, 50); // Smooth 20fps animation

    return () => clearInterval(interval);
  }, [positions.length]);

  if (loadedImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-blue-300">Loading gallery images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600"></div>
      </div>

      {/* Floating Images */}
      {loadedImages.map((image, index) => {
        const pos = positions[index];
        if (!pos) return null;

        return (
          <div
            key={index}
            className="absolute cursor-pointer group transition-all duration-300"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${pos.scale})`,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              animationDelay: `${pos.delay}s`,
              zIndex: 10 + index,
            }}
            onClick={() => onImageClick(image)}
            onMouseEnter={(e) => {
              e.currentTarget.style.zIndex = 1000;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.zIndex = 10 + index;
            }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              {/* Image Container */}
              <div className="relative w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-40 lg:w-64 lg:h-44 rounded-xl overflow-hidden border-3 border-cyan-500/30 group-hover:border-cyan-400 shadow-2xl transform group-hover:scale-150 group-hover:rotate-0 transition-all duration-700 ease-out">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Zoom Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <div className="bg-cyan-500/95 backdrop-blur-sm rounded-full p-3 shadow-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Image Number Badge */}
                <div className="absolute top-2 right-2 bg-cyan-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                  {index + 1}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm bg-slate-800/90 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 z-[2000] shadow-xl">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Hover and click any image to enlarge • {loadedImages.length} images
        </span>
      </div>
    </div>
  );
};

export default AboutUsPage;