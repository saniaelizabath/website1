// src/components/AdminDashboard.jsx
import { useState } from 'react';

const AdminDashboard = ({ newsEvents, setNewsEvents, careers, setCareers }) => {
  const [activeTab, setActiveTab] = useState('news');
  const [newsForm, setNewsForm] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: ''
  });
  const [careerForm, setCareerForm] = useState({
    title: '',
    description: '',
    location: ''
  });

  // Handle News Form
  const handleNewsImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsForm({
          ...newsForm,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title: newsForm.title,
      description: newsForm.description,
      image: newsForm.imagePreview,
      date: new Date().toLocaleDateString()
    };
    setNewsEvents([...newsEvents, newEvent]);
    setNewsForm({ title: '', description: '', image: null, imagePreview: '' });
    alert('News/Event added successfully!');
  };

  const handleCareerSubmit = (e) => {
    e.preventDefault();
    const newCareer = {
      id: Date.now(),
      title: careerForm.title,
      description: careerForm.description,
      location: careerForm.location,
      postedDate: new Date().toLocaleDateString()
    };
    setCareers([...careers, newCareer]);
    setCareerForm({ title: '', description: '', location: '' });
    alert('Career posting added successfully!');
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Are you sure you want to delete this news/event?')) {
      setNewsEvents(newsEvents.filter(item => item.id !== id));
    }
  };

  const handleDeleteCareer = (id) => {
    if (window.confirm('Are you sure you want to delete this career posting?')) {
      setCareers(careers.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Dashboard</span>
          </h1>
          <p className="text-blue-200">Manage website content and postings</p>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-4 bg-slate-800/50 p-2 rounded-xl">
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              News & Events
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'careers'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              Careers
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* News & Events Form */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-6">Add News/Event</h2>
                <form onSubmit={handleNewsSubmit} className="space-y-6">
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Title *</label>
                    <input
                      type="text"
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                      required
                      className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewsImageChange}
                      required
                      className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                    {newsForm.imagePreview && (
                      <img src={newsForm.imagePreview} alt="Preview" className="mt-4 h-40 rounded-lg object-cover" />
                    )}
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Description *</label>
                    <textarea
                      value={newsForm.description}
                      onChange={(e) => setNewsForm({...newsForm, description: e.target.value})}
                      required
                      rows="6"
                      className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                      placeholder="Event description..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Add News/Event
                  </button>
                </form>
              </div>

              {/* Existing News/Events */}
              {newsEvents.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
                  <h3 className="text-xl font-bold text-white mb-6">Existing News/Events</h3>
                  <div className="space-y-4">
                    {newsEvents.map((item) => (
                      <div key={item.id} className="bg-slate-900/50 p-4 rounded-lg border border-blue-500/20 flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{item.title}</h4>
                          <p className="text-blue-300 text-sm mt-1">{item.date}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Careers Form */}
          {activeTab === 'careers' && (
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-6">Add Career Opening</h2>
                <form onSubmit={handleCareerSubmit} className="space-y-6">
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Job Title *</label>
                    <input
                      type="text"
                      value={careerForm.title}
                      onChange={(e) => setCareerForm({...careerForm, title: e.target.value})}
                      required
                      className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Marine Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Location *</label>
                    <input
                      type="text"
                      value={careerForm.location}
                      onChange={(e) => setCareerForm({...careerForm, location: e.target.value})}
                      required
                      className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Kochi, Kerala"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Job Description *</label>
                    <textarea
                      value={careerForm.description}
                      onChange={(e) => setCareerForm({...careerForm, description: e.target.value})}
                      required
                      rows="8"
                      className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                      placeholder="Job requirements, responsibilities, qualifications..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Add Career Opening
                  </button>
                </form>
              </div>

              {/* Existing Careers */}
              {careers.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
                  <h3 className="text-xl font-bold text-white mb-6">Existing Career Openings</h3>
                  <div className="space-y-4">
                    {careers.map((item) => (
                      <div key={item.id} className="bg-slate-900/50 p-4 rounded-lg border border-blue-500/20 flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{item.title}</h4>
                          <p className="text-cyan-400 text-sm mt-1">{item.location}</p>
                          <p className="text-blue-300 text-sm">{item.postedDate}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCareer(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;