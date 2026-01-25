// src/components/AboutPage.jsx
import { useEffect, useState } from 'react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Expert Team Members" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for perfection in every project, ensuring the highest standards of quality and precision."
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "Trust and transparency form the foundation of our relationships with clients and partners."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "We embrace cutting-edge technology and creative solutions to tackle complex marine challenges."
    },
    {
      icon: "🛡️",
      title: "Safety",
      description: "The safety of our team and clients is paramount in everything we do, with no compromises."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZ2LTZoNnYtem0wIDZoLTZ2Nmg2di02em0tNi02aC02djZoNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Us</span>
          </h1>
          <p className="text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            Pioneering excellence in marine engineering and diving services
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">Our Story</h2>
              <p className="text-blue-100 leading-relaxed">
                Founded with a vision to revolutionize marine services, Mag Marine Services has grown from a small team of passionate professionals to a leading force in the maritime industry. Our journey has been marked by unwavering commitment to quality, safety, and innovation.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Every challenge we've faced has strengthened our resolve to deliver exceptional results. We've built our reputation on trust, technical expertise, and the ability to execute complex projects with precision and efficiency.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Today, we stand proud as a trusted partner to clients across the marine sector, continuously evolving to meet the industry's dynamic demands while staying true to our core values.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <img 
                  src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800" 
                  alt="Marine Operations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl -z-10 blur-xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-blue-100 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-950 to-cyan-950">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-xl text-blue-100 leading-relaxed">
              To deliver world-class marine engineering and diving services that exceed client expectations, 
              while maintaining the highest standards of safety, quality, and environmental responsibility.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-xl text-blue-100 leading-relaxed">
              To be the most trusted and innovative marine services provider globally, 
              setting industry benchmarks through continuous improvement and technological advancement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;