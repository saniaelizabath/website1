// src/components/Awards.jsx
const Awards = () => {
  const awards = [
    {
      title: "Rising Kerala Business Summit 2025",
      subtitle: "Kerala Marine Enterprise Excellence Award",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Best of Kerala Business Summit 2025",
      subtitle: "Promising Startup Award",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 to-blue-950 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            AWARDS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ACHIEVEMENTS</span>
          </h2>
          <p className="text-blue-200 text-lg">
            Recognition for excellence and innovation in marine services
          </p>
        </div>

        {/* Awards Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/50 to-blue-950/30 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3"
            >
              {/* Award Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                  {award.icon}
                </div>
              </div>

              {/* Award Title */}
              <h3 className="text-2xl font-bold text-white text-center mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {award.title}
              </h3>

              {/* Award Subtitle */}
              <p className="text-blue-200 text-center text-lg">
                {award.subtitle}
              </p>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-32 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional Achievement Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-slate-800/30 backdrop-blur-sm px-8 py-4 rounded-full border border-cyan-500/30">
            <p className="text-cyan-400 font-semibold text-lg">
              🏆 Leading the way in marine excellence since establishment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;