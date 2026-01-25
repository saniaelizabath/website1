

// // src/components/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import API from "../api";

// const AdminDashboard = ({ newsEvents, setNewsEvents, careers, setCareers }) => {
//   const [activeTab, setActiveTab] = useState("news");

//   const [editingNewsId, setEditingNewsId] = useState(null);
//   const [editingCareerId, setEditingCareerId] = useState(null);

//   const [newsForm, setNewsForm] = useState({
//     title: "",
//     description: "",
//     image: null,
//     imagePreview: "",
//   });

//   const [careerForm, setCareerForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//   });

//   // -------------------------
//   // Load existing data
//   // -------------------------
//   const loadNews = async () => {
//     const res = await API.get("/news");
//     setNewsEvents(
//       res.data.map((item) => ({
//         id: item.id,
//         title: item.title,
//         description: item.description,
//         image: `http://127.0.0.1:8000/${item.image_path}`,
//         date: String(new Date().getFullYear()),
//       }))
//     );
//   };

//   const loadCareers = async () => {
//     const res = await API.get("/jobs");
//     setCareers(
//       res.data.map((job) => ({
//         id: job.id,
//         title: job.title,
//         description: job.description,
//         location: "India",
//         postedDate: new Date().toLocaleDateString(),
//       }))
//     );
//   };

//   useEffect(() => {
//     loadNews();
//     loadCareers();
//   }, []);

//   // -------------------------
//   // Image Preview
//   // -------------------------
//   const handleNewsImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewsForm({
//         ...newsForm,
//         image: file,
//         imagePreview: reader.result,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   // -------------------------
//   // ADD / UPDATE NEWS
//   // -------------------------
//   const handleNewsSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", newsForm.title);
//       formData.append("description", newsForm.description);
//       if (newsForm.image) {
//         formData.append("image", newsForm.image);
//       }

//       if (editingNewsId) {
//         await API.put(`/news/${editingNewsId}`, formData);
//         setEditingNewsId(null);
//       } else {
//         await API.post("/news", formData);
//       }

//       await loadNews();
//       setNewsForm({ title: "", description: "", image: null, imagePreview: "" });
//       alert("News/Event saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save news");
//     }
//   };

//   // -------------------------
//   // EDIT / DELETE NEWS
//   // -------------------------
//   const handleEditNews = (item) => {
//     setEditingNewsId(item.id);
//     setNewsForm({
//       title: item.title,
//       description: item.description,
//       image: null,
//       imagePreview: item.image,
//     });
//   };

//   const handleDeleteNews = async (id) => {
//     if (!window.confirm("Delete this news/event?")) return;
//     await API.delete(`/news/${id}`);
//     await loadNews();
//   };

//   // -------------------------
//   // ADD / UPDATE CAREER
//   // -------------------------
//   const handleCareerSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingCareerId) {
//         await API.put(`/jobs/${editingCareerId}`, {
//           title: careerForm.title,
//           description: careerForm.description,
//         });
//         setEditingCareerId(null);
//       } else {
//         await API.post("/jobs", {
//           title: careerForm.title,
//           description: careerForm.description,
//         });
//       }

//       await loadCareers();
//       setCareerForm({ title: "", description: "", location: "" });
//       alert("Career saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save career");
//     }
//   };

//   // -------------------------
//   // EDIT / DELETE CAREER
//   // -------------------------
//   const handleEditCareer = (job) => {
//     setEditingCareerId(job.id);
//     setCareerForm({
//       title: job.title,
//       description: job.description,
//       location: job.location,
//     });
//   };

//   const handleDeleteCareer = async (id) => {
//     if (!window.confirm("Delete this job posting?")) return;
//     await API.delete(`/jobs/${id}`);
//     await loadCareers();
//   };

//   // -------------------------
//   // UI (UNCHANGED)
//   // -------------------------
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-white mb-4">
//             Admin{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//               Dashboard
//             </span>
//           </h1>
//           <p className="text-blue-200">Manage website content and postings</p>
//         </div>

//         {/* Tabs */}
//         <div className="max-w-4xl mx-auto mb-8">
//           <div className="flex gap-4 bg-slate-800/50 p-2 rounded-xl">
//             <button
//               onClick={() => setActiveTab("news")}
//               className={`flex-1 py-3 rounded-lg ${
//                 activeTab === "news"
//                   ? "bg-blue-600 text-white"
//                   : "text-blue-300"
//               }`}
//             >
//               News & Events
//             </button>
//             <button
//               onClick={() => setActiveTab("careers")}
//               className={`flex-1 py-3 rounded-lg ${
//                 activeTab === "careers"
//                   ? "bg-blue-600 text-white"
//                   : "text-blue-300"
//               }`}
//             >
//               Careers
//             </button>
//           </div>
//         </div>

//         {/* NEWS */}
//         {activeTab === "news" && (
//           <div className="max-w-4xl mx-auto space-y-6">
//             <form onSubmit={handleNewsSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 value={newsForm.title}
//                 onChange={(e) =>
//                   setNewsForm({ ...newsForm, title: e.target.value })
//                 }
//                 required
//                 placeholder="Title"
//                 className="w-full px-4 py-3"
//               />
//               <input type="file" accept="image/*" onChange={handleNewsImageChange} />
//               {newsForm.imagePreview && (
//                 <img src={newsForm.imagePreview} className="h-40 rounded-lg" />
//               )}
//               <textarea
//                 value={newsForm.description}
//                 onChange={(e) =>
//                   setNewsForm({ ...newsForm, description: e.target.value })
//                 }
//                 required
//                 rows="5"
//                 className="w-full px-4 py-3"
//               />
//               <button className="w-full py-4 bg-blue-600 text-white">
//                 {editingNewsId ? "Update News/Event" : "Add News/Event"}
//               </button>
//             </form>

//             {newsEvents.map((item) => (
//               <div key={item.id} className="flex justify-between bg-slate-800 p-4">
//                 <span className="text-white">{item.title}</span>
//                 <div className="flex gap-3">
//                   <button onClick={() => handleEditNews(item)}>Edit</button>
//                   <button onClick={() => handleDeleteNews(item.id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* CAREERS */}
//         {activeTab === "careers" && (
//           <div className="max-w-4xl mx-auto space-y-6">
//             <form onSubmit={handleCareerSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 value={careerForm.title}
//                 onChange={(e) =>
//                   setCareerForm({ ...careerForm, title: e.target.value })
//                 }
//                 required
//                 placeholder="Job Title"
//                 className="w-full px-4 py-3"
//               />
//               <textarea
//                 value={careerForm.description}
//                 onChange={(e) =>
//                   setCareerForm({ ...careerForm, description: e.target.value })
//                 }
//                 required
//                 rows="5"
//                 className="w-full px-4 py-3"
//               />
//               <button className="w-full py-4 bg-blue-600 text-white">
//                 {editingCareerId ? "Update Career" : "Add Career"}
//               </button>
//             </form>

//             {careers.map((job) => (
//               <div key={job.id} className="flex justify-between bg-slate-800 p-4">
//                 <span className="text-white">{job.title}</span>
//                 <div className="flex gap-3">
//                   <button onClick={() => handleEditCareer(job)}>Edit</button>
//                   <button onClick={() => handleDeleteCareer(job.id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import API from "../api";

const AdminDashboard = ({ newsEvents, setNewsEvents, careers, setCareers }) => {
  const [activeTab, setActiveTab] = useState("news");

  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editingCareerId, setEditingCareerId] = useState(null);

  const [newsForm, setNewsForm] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    imagePreview: "",
  });

  const [careerForm, setCareerForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  // =========================
  // LOAD DATA
  // =========================
  const loadNews = async () => {
    const res = await API.get("/news");
    setNewsEvents(
      res.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        image: `http://127.0.0.1:8000/${item.image_path}`,
      }))
    );
  };

  const loadCareers = async () => {
    const res = await API.get("/jobs");
    setCareers(
      res.data.map((job) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
      }))
    );
  };

  useEffect(() => {
    loadNews();
    loadCareers();
  }, []);

  // =========================
  // IMAGE PREVIEW
  // =========================
  const handleNewsImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewsForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // =========================
  // ADD / UPDATE NEWS
  // =========================
  const handleNewsSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newsForm.title);
      formData.append("description", newsForm.description);
      formData.append("date", newsForm.date);

      if (newsForm.image) {
        formData.append("image", newsForm.image);
      }

      if (editingNewsId) {
        await API.put(`/news/${editingNewsId}`, formData);
        setEditingNewsId(null);
      } else {
        await API.post("/news", formData);
      }

      await loadNews();
      setNewsForm({
        title: "",
        description: "",
        date: "",
        image: null,
        imagePreview: "",
      });

      alert("News/Event saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save news");
    }
  };

  // =========================
  // EDIT / DELETE NEWS
  // =========================
  const handleEditNews = (item) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title,
      description: item.description,
      date: item.date,
      image: null,
      imagePreview: item.image,
    });
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm("Delete this news/event?")) return;
    await API.delete(`/news/${id}`);
    await loadNews();
  };

  // =========================
  // ADD / UPDATE CAREER
  // =========================
  const handleCareerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCareerId) {
        await API.put(`/jobs/${editingCareerId}`, careerForm);
        setEditingCareerId(null);
      } else {
        await API.post("/jobs", careerForm);
      }

      await loadCareers();
      setCareerForm({ title: "", description: "", location: "" });

      alert("Career saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save career");
    }
  };

  // =========================
  // EDIT / DELETE CAREER
  // =========================
  const handleEditCareer = (job) => {
    setEditingCareerId(job.id);
    setCareerForm({
      title: job.title,
      description: job.description,
      location: job.location,
    });
  };

  const handleDeleteCareer = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;
    await API.delete(`/jobs/${id}`);
    await loadCareers();
  };

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 show">
          <h1 className="text-5xl font-bold text-white mb-4">
            Admin <span className="text-cyan-400">Dashboard</span>
          </h1>
          <p className="text-blue-200">Manage website content and postings</p>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-4 bg-slate-800/50 p-2 rounded-xl">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex-1 py-3 rounded-lg ${
                activeTab === "news"
                  ? "bg-blue-600 text-white"
                  : "text-blue-300"
              }`}
            >
              News & Events
            </button>
            <button
              onClick={() => setActiveTab("careers")}
              className={`flex-1 py-3 rounded-lg ${
                activeTab === "careers"
                  ? "bg-blue-600 text-white"
                  : "text-blue-300"
              }`}
            >
              Careers
            </button>
          </div>
        </div>

        {/* NEWS */}
        {activeTab === "news" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <input
                type="text"
                value={newsForm.title}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, title: e.target.value })
                }
                required
                placeholder="Title"
                className="w-full px-4 py-3"
              />

              <input
                type="date"
                value={newsForm.date}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, date: e.target.value })
                }
                required
                className="w-full px-4 py-3"
              />

              <input type="file" accept="image/*" onChange={handleNewsImageChange} />

              {newsForm.imagePreview && (
                <img src={newsForm.imagePreview} className="h-40 rounded-lg" />
              )}

              <textarea
                value={newsForm.description}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, description: e.target.value })
                }
                required
                rows="5"
                className="w-full px-4 py-3"
              />

              <button className="w-full py-4 bg-blue-600 text-white">
                {editingNewsId ? "Update News/Event" : "Add News/Event"}
              </button>
            </form>

            {newsEvents.map((item) => (
              <div key={item.id} className="flex justify-between bg-slate-800 p-4">
                <span className="text-white">{item.title}</span>
                <div className="flex gap-3">
                  <button onClick={() => handleEditNews(item)}>Edit</button>
                  <button onClick={() => handleDeleteNews(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CAREERS */}
        {activeTab === "careers" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <form onSubmit={handleCareerSubmit} className="space-y-4">
              <input
                type="text"
                value={careerForm.title}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, title: e.target.value })
                }
                required
                placeholder="Job Title"
                className="w-full px-4 py-3"
              />

              <input
                type="text"
                value={careerForm.location}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, location: e.target.value })
                }
                required
                placeholder="Location"
                className="w-full px-4 py-3"
              />

              <textarea
                value={careerForm.description}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, description: e.target.value })
                }
                required
                rows="5"
                className="w-full px-4 py-3"
              />

              <button className="w-full py-4 bg-blue-600 text-white">
                {editingCareerId ? "Update Career" : "Add Career"}
              </button>
            </form>

            {careers.map((job) => (
              <div key={job.id} className="flex justify-between bg-slate-800 p-4">
                <span className="text-white">{job.title}</span>
                <div className="flex gap-3">
                  <button onClick={() => handleEditCareer(job)}>Edit</button>
                  <button onClick={() => handleDeleteCareer(job.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
