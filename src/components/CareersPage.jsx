// src/components/CareersPage.jsx
const CareersPage = ({ careers }) => {
  const handleApply = (jobTitle) => {
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(`Dear Hiring Team,\n\nI am writing to express my interest in the ${jobTitle} position at Mag Marine Services.\n\nPlease find my resume attached.\n\nBest regards,`);
    window.location.href = `mailto:sania.elizabath@btech.christuniversity.in?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Team</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            Build your career with India's leading marine services provider. 
            Explore exciting opportunities and be part of something extraordinary.
          </p>
        </div>

        {/* Application Process Info */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <svg className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">How to Apply</h3>
                <p className="text-blue-200 leading-relaxed">
                  Click the "Apply Now" button on any job posting below. You'll be redirected to your email client 
                  where you can send us your resume and cover letter. Make sure to include your detailed CV and 
                  a brief introduction about yourself. We look forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Listings */}
        {careers.length > 0 ? (
          <div className="max-w-5xl mx-auto space-y-6">
            {careers.map((job) => (
              <div
                key={job.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-cyan-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Posted: {job.postedDate}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(job.title)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>

                  {/* Job Description */}
                  <div className="border-t border-blue-500/20 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Job Description</h3>
                    <p className="text-blue-200 leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm p-12 rounded-2xl border border-blue-500/20 text-center">
              <svg className="w-24 h-24 mx-auto text-blue-500/50 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-3">No Open Positions</h3>
              <p className="text-blue-200 mb-6">
                We don't have any open positions at the moment, but we're always looking for talented individuals. 
                Feel free to send us your resume for future opportunities.
              </p>
              <button
                onClick={() => handleApply('General Application')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <span>Send Your Resume</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Why Join Us Section */}
        <div className="max-w-5xl mx-auto mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">With Us?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Career Growth",
                description: "Continuous learning and advancement opportunities"
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Great Team",
                description: "Work with industry experts and passionate professionals"
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Benefits",
                description: "Competitive salary and comprehensive benefits package"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-300 text-center"
              >
                <div className="text-cyan-400 flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-blue-200 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default CareersPage;