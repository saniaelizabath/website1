// src/components/Certifications.jsx
const Certifications = () => {
  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Certified Company",
      image: "https://via.placeholder.com/200x200/1e3a8a/60a5fa?text=ISO+9001:2015"
    },
    {
      name: "Kerala Startup Mission",
      description: "Recognized Startup",
      image: "https://via.placeholder.com/200x200/0891b2/06b6d4?text=Kerala+Startup"
    },
    {
      name: "Startup India",
      description: "Government Recognized",
      image: "https://via.placeholder.com/200x200/f59e0b/fbbf24?text=Startup+India"
    },
    {
      name: "MSME",
      description: "Ministry of MSME, Govt. of India",
      image: "https://via.placeholder.com/200x200/1e40af/3b82f6?text=MSME+India"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-950 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            ACCREDITATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">CERTIFICATION</span>
          </h2>
          <p className="text-blue-200 text-lg">
            Recognized and certified by leading institutions
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-3 flex flex-col items-center"
            >
              {/* Image Container */}
              <div className="w-full aspect-square mb-4 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center p-4">
                <img 
                  src={cert.image} 
                  alt={cert.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text */}
              <h3 className="text-white font-bold text-center mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {cert.name}
              </h3>
              <p className="text-blue-300 text-sm text-center">
                {cert.description}
              </p>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent rounded-2xl transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-blue-200 text-sm max-w-2xl mx-auto">
            Our certifications demonstrate our commitment to quality, safety, and continuous improvement in all our marine services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;