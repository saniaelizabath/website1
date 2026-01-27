// src/components/Accreditation.jsx
import { useEffect, useState } from 'react';

const Accreditation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('accreditation');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      image: "/awlogo/iso.png",
      title: "ISO 9001:2015",
      subtitle: "Certified Company",
      description: "Quality Management System certification ensuring consistent delivery of high-quality marine services."
    },
    {
      image: "/awlogo/smission.png",
      title: "Kerala Startup Mission",
      subtitle: "Recognized Startup",
      description: "Officially recognized by Kerala Startup Mission for innovation in marine engineering solutions."
    },
    {
      image: "/awlogo/startup.png",
      title: "Startup India",
      subtitle: "Government Recognized",
      description: "Certified by the Government of India's Startup India initiative for entrepreneurial excellence."
    },
    {
      image: "/awlogo/msme.png",
      title: "MSME",
      subtitle: "Ministry of MSME, Govt. of India",
      description: "Registered as a Micro, Small & Medium Enterprise, committed to supporting India's industrial growth."
    }
  ];

  return (
    <section 
      id="accreditation"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/awlogo/finalcert.webp)' }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/20"></div>
        
        {/* Optional: Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30"></div>
      </div>

      <div 
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            ACCREDITATION & <span className="text-blue-700">CERTIFICATION</span>
          </h2>
          <div className="w-24 h-0.5 bg-blue-700 mx-auto mt-5 mb-5"></div>
          <p className="text-slate-700 text-lg mb-3 font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Recognized and certified by leading institutions
          </p>
          <p className="text-blue-800 text-xl font-light italic" style={{ fontFamily: 'Georgia, serif' }}>
            Where marine challenges meet reliable solutions.
          </p>
        </div>

        {/* Certifications Grid - Larger */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-white/75 backdrop-blur-md rounded-2xl border border-blue-300/40 hover:border-blue-500/70 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-blue-300/50 transform hover:-translate-y-2"
            >
              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center">
                {/* Image Container */}
                <div className="w-full h-40 mb-4 flex items-center justify-center bg-slate-50/80 rounded-xl p-4">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    {cert.title}
                  </h3>
                  <p className="text-blue-600 text-sm mb-3 font-light">
                    {cert.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light" style={{ fontFamily: 'Georgia, serif' }}>
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Description */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-blue-300/40 p-6">
            <p className="text-slate-700 text-base leading-relaxed font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
              Our certifications demonstrate our commitment to quality, safety, and continuous improvement in all our marine services. 
              We adhere to international standards and best practices, ensuring excellence and reliability.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Background image styles are handled inline */
      `}</style>
    </section>
  );
};

export default Accreditation;