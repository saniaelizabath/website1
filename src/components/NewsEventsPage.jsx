// src/components/NewsEventsPage.jsx
import { useEffect, useState } from "react";
import API from "../api";

const NewsEventsPage = () => {
  const [newsEvents, setNewsEvents] = useState([]);

  // -------------------------
  // Fetch news from backend
  // -------------------------
  useEffect(() => {
    API.get("/news")
      .then((res) => {
        setNewsEvents(
          res.data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: `http://127.0.0.1:8000/${item.image_path}`,
            date: item.date,
          }))
        );
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            News &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Events
            </span>
          </h1>
          <p className="text-blue-200 text-lg">
            Stay updated with our latest achievements and activities
          </p>
        </div>

        {/* News Grid */}
        {newsEvents.length > 0 ? (
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsEvents.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                    {item.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-blue-200 leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm p-12 rounded-2xl border border-blue-500/20">
              <svg
                className="w-24 h-24 mx-auto text-blue-500/50 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-3">
                No News or Events Yet
              </h3>
              <p className="text-blue-200 mb-6">
                Check back soon for updates on our latest achievements and
                activities
              </p>
            </div>
          </div>
        )}
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
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NewsEventsPage;
