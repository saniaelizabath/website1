

// import { useState, useEffect } from "react";
// import API from "../api";

// const AdminDashboard = ({ newsEvents, setNewsEvents, careers, setCareers }) => {
//   const [activeTab, setActiveTab] = useState("news");

//   const [editingNewsId, setEditingNewsId] = useState(null);
//   const [editingCareerId, setEditingCareerId] = useState(null);

//   const [newsForm, setNewsForm] = useState({
//     title: "",
//     description: "",
//     date: "",
//     image: null,
//     imagePreview: "",
//   });

//   const [careerForm, setCareerForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//   });

//   // NEW: Attendance states
//   const [allAttendance, setAllAttendance] = useState([]);
//   const [attendanceStats, setAttendanceStats] = useState({
//     totalEmployees: 0,
//     presentToday: 0,
//     absentToday: 0,
//     incompleteToday: 0,
//   });
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [loadingAttendance, setLoadingAttendance] = useState(false);

//   // Google Sheets Links
//   const googleSheetsLinks = [
//     {
//       name: "Attendance of Employees under Managers",
//       icon: "👥",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Project Assigned ~ Project Report",
//       icon: "📋",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Time Sheet of Managers",
//       icon: "⏰",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Policy Hub",
//       icon: "📚",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Inventory Management",
//       icon: "📦",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Petty Cash Management",
//       icon: "💰",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Salary Advance",
//       icon: "💵",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Approved PR",
//       icon: "✅",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Managers Attendance Sheet",
//       icon: "📊",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     }
//   ];

//   // =========================
//   // AUTH GUARD
//   // =========================
//   useEffect(() => {
//     const token = localStorage.getItem("admin_token");
//     if (!token) {
//       window.location.href = "/";
//     }
//   }, []);

//   // =========================
//   // LOGOUT
//   // =========================
//   const handleLogout = () => {
//     localStorage.removeItem("admin_token");
//     window.location.href = "/";
//   };

//   // =========================
//   // LOAD DATA
//   // =========================
//   const loadNews = async () => {
//     const res = await API.get("/news");
//     setNewsEvents(
//       res.data.map((item) => ({
//         id: item.id,
//         title: item.title,
//         description: item.description,
//         date: item.date,
//         image: `http://127.0.0.1:8000/${item.image_path}`,
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
//         location: job.location,
//       }))
//     );
//   };

//   // NEW: Load all employees attendance
//   const loadAllAttendance = async () => {
//     setLoadingAttendance(true);
//     try {
//       // Fetch all employees
//       const employeesRes = await API.get("/employees");
//       const employees = employeesRes.data;

//       // Fetch attendance for each employee
//       const attendancePromises = employees.map(async (employee) => {
//         try {
//           const attendanceRes = await API.get(`/attendance/${employee.id}`);
//           return {
//             employee,
//             records: attendanceRes.data,
//           };
//         } catch (err) {
//           console.error(`Error fetching attendance for ${employee.name}:`, err);
//           return {
//             employee,
//             records: [],
//           };
//         }
//       });

//       const allData = await Promise.all(attendancePromises);
//       setAllAttendance(allData);

//       // Calculate today's stats
//       calculateTodayStats(allData);
//     } catch (err) {
//       console.error("Error loading attendance:", err);
//     } finally {
//       setLoadingAttendance(false);
//     }
//   };

//   // NEW: Calculate today's attendance statistics
//   const calculateTodayStats = (attendanceData) => {
//     const today = new Date().toISOString().split('T')[0];
    
//     let presentToday = 0;
//     let absentToday = 0;
//     let incompleteToday = 0;

//     attendanceData.forEach(({ records }) => {
//       const todayRecord = records.find(r => {
//         const recordDate = new Date(r.date).toISOString().split('T')[0];
//         return recordDate === today;
//       });

//       if (todayRecord) {
//         if (todayRecord.in_time && todayRecord.out_time) {
//           presentToday++;
//         } else if (todayRecord.in_time) {
//           incompleteToday++;
//         } else {
//           absentToday++;
//         }
//       } else {
//         absentToday++;
//       }
//     });

//     setAttendanceStats({
//       totalEmployees: attendanceData.length,
//       presentToday,
//       absentToday,
//       incompleteToday,
//     });
//   };

//   useEffect(() => {
//     loadNews();
//     loadCareers();
//     loadAllAttendance();
//   }, []);

//   // =========================
//   // IMAGE PREVIEW
//   // =========================
//   const handleNewsImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewsForm((prev) => ({
//         ...prev,
//         image: file,
//         imagePreview: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // =========================
//   // ADD / UPDATE NEWS
//   // =========================
//   const handleNewsSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", newsForm.title);
//       formData.append("description", newsForm.description);
//       formData.append("date", newsForm.date);

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
//       setNewsForm({
//         title: "",
//         description: "",
//         date: "",
//         image: null,
//         imagePreview: "",
//       });

//       alert("News/Event saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save news");
//     }
//   };

//   // =========================
//   // EDIT / DELETE NEWS
//   // =========================
//   const handleEditNews = (item) => {
//     setEditingNewsId(item.id);
//     setNewsForm({
//       title: item.title,
//       description: item.description,
//       date: item.date,
//       image: null,
//       imagePreview: item.image,
//     });
//   };

//   const handleDeleteNews = async (id) => {
//     if (!window.confirm("Delete this news/event?")) return;
//     await API.delete(`/news/${id}`);
//     await loadNews();
//   };

//   // =========================
//   // ADD / UPDATE CAREER
//   // =========================
//   const handleCareerSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingCareerId) {
//         await API.put(`/jobs/${editingCareerId}`, careerForm);
//         setEditingCareerId(null);
//       } else {
//         await API.post("/jobs", careerForm);
//       }

//       await loadCareers();
//       setCareerForm({ title: "", description: "", location: "" });

//       alert("Career saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save career");
//     }
//   };

//   // =========================
//   // EDIT / DELETE CAREER
//   // =========================
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

//   // NEW: Handle Google Sheets redirect
//   const handleOpenSheet = (url) => {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   // NEW: Format time helper
//   const formatTime = (datetime) => {
//     if (!datetime) return '-';
//     const date = new Date(datetime);
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: true 
//     });
//   };

//   // NEW: Format date helper
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // NEW: Calculate total hours
//   const calculateTotalHours = (inTime, outTime) => {
//     if (!inTime || !outTime) return '-';
    
//     const start = new Date(inTime);
//     const end = new Date(outTime);
//     const diffMs = end - start;
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${diffHours}h ${diffMinutes}m`;
//   };

//   // NEW: Get attendance percentage for an employee
//   const getAttendancePercentage = (records) => {
//     if (records.length === 0) return 0;
//     const presentDays = records.filter(r => r.in_time && r.out_time).length;
//     return ((presentDays / records.length) * 100).toFixed(1);
//   };

//   // =========================
//   // UI
//   // =========================
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
//       <div className="container mx-auto px-6">

//         {/* HEADER + LOGOUT */}
//         <div className="flex justify-between items-center mb-12">
//           <div>
//             <h1 className="text-5xl font-bold text-white mb-2">
//               Admin <span className="text-cyan-400">Dashboard</span>
//             </h1>
//             <p className="text-blue-200">Manage website content and postings</p>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500/20 border border-red-500/40 text-red-400 px-6 py-3 rounded-lg hover:bg-red-500/30 transition-all duration-300 font-semibold"
//           >
//             Logout
//           </button>
//         </div>

//         {/* GOOGLE SHEETS QUICK ACCESS */}
//         <div className="mb-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
//           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//             <span className="text-cyan-400">📑</span> Google Sheets Quick Access
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {googleSheetsLinks.map((link, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleOpenSheet(link.url)}
//                 className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-700 hover:scale-105 transition-all duration-300 group"
//               >
//                 <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
//                   {link.icon}
//                 </span>
//                 <span className="text-white text-xs text-center leading-tight">
//                   {link.name}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* TABS */}
//         <div className="max-w-6xl mx-auto mb-8">
//           <div className="flex gap-4 bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm">
//             <button
//               onClick={() => setActiveTab("news")}
//               className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                 activeTab === "news"
//                   ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
//                   : "text-blue-300 hover:bg-slate-700/50"
//               }`}
//             >
//               📰 News & Events
//             </button>
//             <button
//               onClick={() => setActiveTab("careers")}
//               className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                 activeTab === "careers"
//                   ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
//                   : "text-blue-300 hover:bg-slate-700/50"
//               }`}
//             >
//               💼 Careers
//             </button>
//             <button
//               onClick={() => setActiveTab("attendance")}
//               className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                 activeTab === "attendance"
//                   ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
//                   : "text-blue-300 hover:bg-slate-700/50"
//               }`}
//             >
//               📊 Attendance
//             </button>
//           </div>
//         </div>

//         {/* NEWS */}
//         {activeTab === "news" && (
//           <div className="max-w-4xl mx-auto space-y-6">
//             <form onSubmit={handleNewsSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 {editingNewsId ? "✏️ Edit News/Event" : "➕ Add News/Event"}
//               </h3>
              
//               <input
//                 type="text"
//                 value={newsForm.title}
//                 onChange={(e) =>
//                   setNewsForm({ ...newsForm, title: e.target.value })
//                 }
//                 required
//                 placeholder="Title"
//                 className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
//               />

//               <input
//                 type="date"
//                 value={newsForm.date}
//                 onChange={(e) =>
//                   setNewsForm({ ...newsForm, date: e.target.value })
//                 }
//                 required
//                 className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
//               />

//               <div className="space-y-2">
//                 <label className="text-blue-300 text-sm font-semibold">Upload Image</label>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleNewsImageChange}
//                   className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
//                 />
//               </div>

//               {newsForm.imagePreview && (
//                 <div className="relative">
//                   <img src={newsForm.imagePreview} className="h-40 w-full object-cover rounded-lg border border-cyan-500/30" />
//                   <button
//                     type="button"
//                     onClick={() => setNewsForm({ ...newsForm, image: null, imagePreview: '' })}
//                     className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}

//               <textarea
//                 value={newsForm.description}
//                 onChange={(e) =>
//                   setNewsForm({ ...newsForm, description: e.target.value })
//                 }
//                 required
//                 rows="5"
//                 placeholder="Description"
//                 className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
//               />

//               <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
//                 {editingNewsId ? "💾 Update News/Event" : "➕ Add News/Event"}
//               </button>
//             </form>

//             <div className="space-y-4">
//               {newsEvents.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
//                   <div className="flex items-center gap-4">
//                     {item.image && (
//                       <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
//                     )}
//                     <div>
//                       <span className="text-white font-semibold text-lg">{item.title}</span>
//                       <p className="text-blue-300 text-sm">{formatDate(item.date)}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button 
//                       onClick={() => handleEditNews(item)}
//                       className="px-4 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteNews(item.id)}
//                       className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300"
//                     >
//                       🗑️ Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CAREERS */}
//         {activeTab === "careers" && (
//           <div className="max-w-4xl mx-auto space-y-6">
//             <form onSubmit={handleCareerSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 {editingCareerId ? "✏️ Edit Career" : "➕ Add Career"}
//               </h3>

//               <input
//                 type="text"
//                 value={careerForm.title}
//                 onChange={(e) =>
//                   setCareerForm({ ...careerForm, title: e.target.value })
//                 }
//                 required
//                 placeholder="Job Title"
//                 className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
//               />

//               <input
//                 type="text"
//                 value={careerForm.location}
//                 onChange={(e) =>
//                   setCareerForm({ ...careerForm, location: e.target.value })
//                 }
//                 required
//                 placeholder="Location"
//                 className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
//               />

//               <textarea
//                 value={careerForm.description}
//                 onChange={(e) =>
//                   setCareerForm({ ...careerForm, description: e.target.value })
//                 }
//                 required
//                 rows="5"
//                 placeholder="Job Description"
//                 className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
//               />

//               <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
//                 {editingCareerId ? "💾 Update Career" : "➕ Add Career"}
//               </button>
//             </form>

//             <div className="space-y-4">
//               {careers.map((job) => (
//                 <div key={job.id} className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
//                   <div>
//                     <span className="text-white font-semibold text-lg">{job.title}</span>
//                     <p className="text-blue-300 text-sm">📍 {job.location}</p>
//                   </div>
//                   <div className="flex gap-3">
//                     <button 
//                       onClick={() => handleEditCareer(job)}
//                       className="px-4 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteCareer(job.id)}
//                       className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300"
//                     >
//                       🗑️ Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ATTENDANCE TAB */}
//         {activeTab === "attendance" && (
//           <div className="max-w-7xl mx-auto space-y-8">
            
//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-cyan-300 text-sm mb-1">Total Employees</p>
//                     <p className="text-4xl font-bold text-white">{attendanceStats.totalEmployees}</p>
//                   </div>
//                   <div className="w-16 h-16 bg-cyan-500/30 rounded-full flex items-center justify-center">
//                     <span className="text-3xl">👥</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-green-300 text-sm mb-1">Present Today</p>
//                     <p className="text-4xl font-bold text-white">{attendanceStats.presentToday}</p>
//                   </div>
//                   <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center">
//                     <span className="text-3xl">✅</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-yellow-300 text-sm mb-1">Incomplete</p>
//                     <p className="text-4xl font-bold text-white">{attendanceStats.incompleteToday}</p>
//                   </div>
//                   <div className="w-16 h-16 bg-yellow-500/30 rounded-full flex items-center justify-center">
//                     <span className="text-3xl">⚠️</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-red-300 text-sm mb-1">Absent Today</p>
//                     <p className="text-4xl font-bold text-white">{attendanceStats.absentToday}</p>
//                   </div>
//                   <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center">
//                     <span className="text-3xl">❌</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Attendance Chart (Visual Bar Chart) */}
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
//               <h3 className="text-2xl font-bold text-white mb-6">📊 Today's Attendance Chart</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-green-300 font-semibold">Present</span>
//                     <span className="text-white">{attendanceStats.presentToday} / {attendanceStats.totalEmployees}</span>
//                   </div>
//                   <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
//                     <div 
//                       className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
//                       style={{ width: `${(attendanceStats.presentToday / attendanceStats.totalEmployees * 100) || 0}%` }}
//                     >
//                       <span className="text-white text-xs font-bold">
//                         {((attendanceStats.presentToday / attendanceStats.totalEmployees * 100) || 0).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-yellow-300 font-semibold">Incomplete</span>
//                     <span className="text-white">{attendanceStats.incompleteToday} / {attendanceStats.totalEmployees}</span>
//                   </div>
//                   <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
//                     <div 
//                       className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
//                       style={{ width: `${(attendanceStats.incompleteToday / attendanceStats.totalEmployees * 100) || 0}%` }}
//                     >
//                       <span className="text-white text-xs font-bold">
//                         {((attendanceStats.incompleteToday / attendanceStats.totalEmployees * 100) || 0).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-red-300 font-semibold">Absent</span>
//                     <span className="text-white">{attendanceStats.absentToday} / {attendanceStats.totalEmployees}</span>
//                   </div>
//                   <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
//                     <div 
//                       className="bg-gradient-to-r from-red-500 to-pink-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
//                       style={{ width: `${(attendanceStats.absentToday / attendanceStats.totalEmployees * 100) || 0}%` }}
//                     >
//                       <span className="text-white text-xs font-bold">
//                         {((attendanceStats.absentToday / attendanceStats.totalEmployees * 100) || 0).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* All Employees Attendance Table */}
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-white">📋 All Employees Attendance</h3>
//                 <button
//                   onClick={loadAllAttendance}
//                   disabled={loadingAttendance}
//                   className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 rounded-lg hover:bg-cyan-600/30 transition-all duration-300 disabled:opacity-50"
//                 >
//                   {loadingAttendance ? "🔄 Loading..." : "🔄 Refresh"}
//                 </button>
//               </div>

//               {loadingAttendance ? (
//                 <div className="text-center py-12">
//                   <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
//                   <p className="text-blue-300 mt-4">Loading attendance data...</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-slate-700">
//                         <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Employee ID</th>
//                         <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Name</th>
//                         <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Total Records</th>
//                         <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Present Days</th>
//                         <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Attendance %</th>
//                         <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Today's Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allAttendance.map(({ employee, records }) => {
//                         const today = new Date().toISOString().split('T')[0];
//                         const todayRecord = records.find(r => {
//                           const recordDate = new Date(r.date).toISOString().split('T')[0];
//                           return recordDate === today;
//                         });
//                         const presentDays = records.filter(r => r.in_time && r.out_time).length;

//                         return (
//                           <tr key={employee.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
//                             <td className="py-4 px-4 text-blue-300 font-mono">{employee.id}</td>
//                             <td className="py-4 px-4 text-white font-semibold">{employee.name}</td>
//                             <td className="py-4 px-4 text-slate-300">{records.length}</td>
//                             <td className="py-4 px-4 text-green-400 font-semibold">{presentDays}</td>
//                             <td className="py-4 px-4">
//                               <div className="flex items-center gap-2">
//                                 <div className="w-24 bg-slate-700 rounded-full h-2">
//                                   <div 
//                                     className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full"
//                                     style={{ width: `${getAttendancePercentage(records)}%` }}
//                                   ></div>
//                                 </div>
//                                 <span className="text-cyan-400 font-semibold text-sm">
//                                   {getAttendancePercentage(records)}%
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="py-4 px-4">
//                               {todayRecord ? (
//                                 todayRecord.in_time && todayRecord.out_time ? (
//                                   <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-sm">
//                                     ✅ Present
//                                   </span>
//                                 ) : todayRecord.in_time ? (
//                                   <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full text-sm">
//                                     ⚠️ Incomplete
//                                   </span>
//                                 ) : (
//                                   <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-sm">
//                                     ❌ Absent
//                                   </span>
//                                 )
//                               ) : (
//                                 <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-sm">
//                                   ❌ Absent
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Individual Employee Details (Expandable) */}
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
//               <h3 className="text-2xl font-bold text-white mb-6">📅 Detailed Attendance Records</h3>
              
//               <div className="space-y-4">
//                 {allAttendance.map(({ employee, records }) => (
//                   <details key={employee.id} className="bg-slate-700/50 rounded-xl border border-cyan-500/20">
//                     <summary className="cursor-pointer p-4 hover:bg-slate-700 rounded-xl transition-colors">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <span className="text-white font-semibold text-lg">{employee.name}</span>
//                           <span className="text-blue-300 text-sm ml-3">ID: {employee.id}</span>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="text-cyan-400 font-semibold">
//                             {records.filter(r => r.in_time && r.out_time).length} / {records.length} days
//                           </span>
//                           <span className="text-slate-400">▼</span>
//                         </div>
//                       </div>
//                     </summary>
                    
//                     <div className="p-4 border-t border-slate-600">
//                       <div className="overflow-x-auto">
//                         <table className="w-full">
//                           <thead>
//                             <tr className="border-b border-slate-600">
//                               <th className="text-left py-2 px-3 text-blue-300 text-sm">Date</th>
//                               <th className="text-left py-2 px-3 text-blue-300 text-sm">IN Time</th>
//                               <th className="text-left py-2 px-3 text-blue-300 text-sm">OUT Time</th>
//                               <th className="text-left py-2 px-3 text-blue-300 text-sm">Total Hours</th>
//                               <th className="text-left py-2 px-3 text-blue-300 text-sm">Status</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {records.length === 0 ? (
//                               <tr>
//                                 <td colSpan="5" className="text-center py-4 text-slate-400">
//                                   No attendance records
//                                 </td>
//                               </tr>
//                             ) : (
//                               records.map((record) => (
//                                 <tr key={record.id} className="border-b border-slate-600/50 hover:bg-slate-600/30 transition-colors">
//                                   <td className="py-2 px-3 text-white text-sm">{formatDate(record.date)}</td>
//                                   <td className="py-2 px-3 text-cyan-400 font-mono text-sm">{formatTime(record.in_time)}</td>
//                                   <td className="py-2 px-3 text-blue-400 font-mono text-sm">{formatTime(record.out_time)}</td>
//                                   <td className="py-2 px-3 text-purple-400 font-mono text-sm">{calculateTotalHours(record.in_time, record.out_time)}</td>
//                                   <td className="py-2 px-3">
//                                     {record.in_time && record.out_time ? (
//                                       <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-xs">
//                                         Present
//                                       </span>
//                                     ) : record.in_time ? (
//                                       <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full text-xs">
//                                         Incomplete
//                                       </span>
//                                     ) : (
//                                       <span className="px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-xs">
//                                         Absent
//                                       </span>
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </details>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




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

  // NEW: Attendance states
  const [allAttendance, setAllAttendance] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    incompleteToday: 0,
  });
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // NEW: Filter states
  const [filterType, setFilterType] = useState('today'); // 'today', 'week', 'month', 'year', 'custom', 'all'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Google Sheets Links
  const googleSheetsLinks = [
    {
      name: "Attendance of Employees under Managers",
      icon: "👥",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Project Assigned ~ Project Report",
      icon: "📋",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Time Sheet of Managers",
      icon: "⏰",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Policy Hub",
      icon: "📚",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Inventory Management",
      icon: "📦",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Petty Cash Management",
      icon: "💰",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Salary Advance",
      icon: "💵",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Approved PR",
      icon: "✅",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Managers Attendance Sheet",
      icon: "📊",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    }
  ];

  // =========================
  // DATE HELPER FUNCTIONS
  // =========================
  
  // Normalize date to YYYY-MM-DD format in local timezone
  const normalizeDate = (date) => {
    if (!date) return null;
    
    let dateObj;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      dateObj = new Date(date);
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    
    // Get local date components to avoid timezone issues
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Get date range based on filter type
  const getDateRange = () => {
    const today = new Date();
    let startDate, endDate;

    switch (filterType) {
      case 'today':
        startDate = endDate = normalizeDate(today);
        break;
      
      case 'week':
        // Get current week (Monday to Sunday)
        const currentDay = today.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        
        startDate = normalizeDate(monday);
        endDate = normalizeDate(sunday);
        break;
      
      case 'month':
        const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
        const lastDay = new Date(selectedYear, selectedMonth, 0);
        startDate = normalizeDate(firstDay);
        endDate = normalizeDate(lastDay);
        break;
      
      case 'year':
        startDate = `${selectedYear}-01-01`;
        endDate = `${selectedYear}-12-31`;
        break;
      
      case 'custom':
        startDate = customStartDate;
        endDate = customEndDate;
        break;
      
      case 'all':
      default:
        startDate = null;
        endDate = null;
        break;
    }

    return { startDate, endDate };
  };

  // Filter records by date range
  const filterRecordsByDateRange = (records) => {
    const { startDate, endDate } = getDateRange();
    
    if (!startDate || !endDate) {
      return records; // Return all if no date range
    }

    return records.filter(record => {
      const recordDate = normalizeDate(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
  };

  // =========================
  // AUTH GUARD
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

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

  // NEW: Load all employees attendance
  const loadAllAttendance = async () => {
    setLoadingAttendance(true);
    try {
      // Fetch all employees
      const employeesRes = await API.get("/employees");
      const employees = employeesRes.data;

      console.log('📊 Fetching attendance for', employees.length, 'employees');

      // Fetch attendance for each employee
      const attendancePromises = employees.map(async (employee) => {
        try {
          const attendanceRes = await API.get(`/attendance/${employee.id}`);
          console.log(`✅ Employee ${employee.name} (${employee.id}):`, attendanceRes.data.length, 'records');
          return {
            employee,
            records: attendanceRes.data,
          };
        } catch (err) {
          console.error(`❌ Error fetching attendance for ${employee.name}:`, err);
          return {
            employee,
            records: [],
          };
        }
      });

      const allData = await Promise.all(attendancePromises);
      setAllAttendance(allData);

      // Calculate today's stats
      calculateTodayStats(allData);
    } catch (err) {
      console.error("Error loading attendance:", err);
    } finally {
      setLoadingAttendance(false);
    }
  };

  // NEW: Calculate today's attendance statistics - FIXED
  const calculateTodayStats = (attendanceData) => {
    const today = normalizeDate(new Date());
    
    console.log('🔍 Calculating stats for today:', today);
    
    let presentToday = 0;
    let absentToday = 0;
    let incompleteToday = 0;

    attendanceData.forEach(({ employee, records }) => {
      const todayRecord = records.find(r => {
        const recordDate = normalizeDate(r.date);
        return recordDate === today;
      });

      if (todayRecord) {
        console.log(`📅 ${employee.name}: Found today's record`, {
          in_time: todayRecord.in_time,
          out_time: todayRecord.out_time
        });
        
        if (todayRecord.in_time && todayRecord.out_time) {
          presentToday++;
          console.log(`✅ ${employee.name}: PRESENT`);
        } else if (todayRecord.in_time) {
          incompleteToday++;
          console.log(`⚠️ ${employee.name}: INCOMPLETE`);
        } else {
          absentToday++;
          console.log(`❌ ${employee.name}: ABSENT (record exists but no IN time)`);
        }
      } else {
        absentToday++;
        console.log(`❌ ${employee.name}: ABSENT (no record for today)`);
      }
    });

    console.log('📊 Final Stats:', { presentToday, incompleteToday, absentToday });

    setAttendanceStats({
      totalEmployees: attendanceData.length,
      presentToday,
      absentToday,
      incompleteToday,
    });
  };

  // Reload attendance when filter changes
  useEffect(() => {
    if (activeTab === 'attendance' && allAttendance.length > 0) {
      calculateTodayStats(allAttendance);
    }
  }, [filterType, selectedMonth, selectedYear, customStartDate, customEndDate]);

  useEffect(() => {
    loadNews();
    loadCareers();
    loadAllAttendance();
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

  // NEW: Handle Google Sheets redirect
  const handleOpenSheet = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // NEW: Format time helper
  const formatTime = (datetime) => {
    if (!datetime) return '-';
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // NEW: Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // NEW: Calculate total hours
  const calculateTotalHours = (inTime, outTime) => {
    if (!inTime || !outTime) return '-';
    
    const start = new Date(inTime);
    const end = new Date(outTime);
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMinutes}m`;
  };

  // NEW: Get attendance percentage for an employee
  const getAttendancePercentage = (records) => {
    const filteredRecords = filterRecordsByDateRange(records);
    if (filteredRecords.length === 0) return 0;
    const presentDays = filteredRecords.filter(r => r.in_time && r.out_time).length;
    return ((presentDays / filteredRecords.length) * 100).toFixed(1);
  };

  // Get filtered stats for display
  const getFilteredStats = () => {
    if (filterType !== 'today') {
      const { startDate, endDate } = getDateRange();
      
      let presentCount = 0;
      let absentCount = 0;
      let incompleteCount = 0;

      allAttendance.forEach(({ records }) => {
        const filteredRecords = filterRecordsByDateRange(records);
        
        filteredRecords.forEach(record => {
          if (record.in_time && record.out_time) {
            presentCount++;
          } else if (record.in_time) {
            incompleteCount++;
          } else {
            absentCount++;
          }
        });
      });

      return {
        present: presentCount,
        incomplete: incompleteCount,
        absent: absentCount,
        total: allAttendance.length
      };
    }

    return {
      present: attendanceStats.presentToday,
      incomplete: attendanceStats.incompleteToday,
      absent: attendanceStats.absentToday,
      total: attendanceStats.totalEmployees
    };
  };

  const filteredStats = getFilteredStats();

  // Get today's status for an employee - FIXED
  const getTodayStatus = (records) => {
    const today = normalizeDate(new Date());
    
    const todayRecord = records.find(r => {
      const recordDate = normalizeDate(r.date);
      return recordDate === today;
    });

    if (todayRecord) {
      if (todayRecord.in_time && todayRecord.out_time) {
        return { status: 'present', label: 'Present', color: 'green' };
      } else if (todayRecord.in_time) {
        return { status: 'incomplete', label: 'Incomplete', color: 'yellow' };
      } else {
        return { status: 'absent', label: 'Absent', color: 'red' };
      }
    }
    
    return { status: 'absent', label: 'Absent', color: 'red' };
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6">

        {/* HEADER + LOGOUT */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">
              Admin <span className="text-cyan-400">Dashboard</span>
            </h1>
            <p className="text-blue-200">Manage website content and postings</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500/20 border border-red-500/40 text-red-400 px-6 py-3 rounded-lg hover:bg-red-500/30 transition-all duration-300 font-semibold"
          >
            Logout
          </button>
        </div>

        {/* GOOGLE SHEETS QUICK ACCESS */}
        <div className="mb-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">📑</span> Google Sheets Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {googleSheetsLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleOpenSheet(link.url)}
                className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-700 hover:scale-105 transition-all duration-300 group"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <span className="text-white text-xs text-center leading-tight">
                  {link.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex gap-4 bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "news"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "text-blue-300 hover:bg-slate-700/50"
              }`}
            >
              📰 News & Events
            </button>
            <button
              onClick={() => setActiveTab("careers")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "careers"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "text-blue-300 hover:bg-slate-700/50"
              }`}
            >
              💼 Careers
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "attendance"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "text-blue-300 hover:bg-slate-700/50"
              }`}
            >
              📊 Attendance
            </button>
          </div>
        </div>

        {/* NEWS */}
        {activeTab === "news" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <form onSubmit={handleNewsSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">
                {editingNewsId ? "✏️ Edit News/Event" : "➕ Add News/Event"}
              </h3>
              
              <input
                type="text"
                value={newsForm.title}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, title: e.target.value })
                }
                required
                placeholder="Title"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
              />

              <input
                type="date"
                value={newsForm.date}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, date: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
              />

              <div className="space-y-2">
                <label className="text-blue-300 text-sm font-semibold">Upload Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleNewsImageChange}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                />
              </div>

              {newsForm.imagePreview && (
                <div className="relative">
                  <img src={newsForm.imagePreview} className="h-40 w-full object-cover rounded-lg border border-cyan-500/30" />
                  <button
                    type="button"
                    onClick={() => setNewsForm({ ...newsForm, image: null, imagePreview: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}

              <textarea
                value={newsForm.description}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, description: e.target.value })
                }
                required
                rows="5"
                placeholder="Description"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
              />

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                {editingNewsId ? "💾 Update News/Event" : "➕ Add News/Event"}
              </button>
            </form>

            <div className="space-y-4">
              {newsEvents.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                    )}
                    <div>
                      <span className="text-white font-semibold text-lg">{item.title}</span>
                      <p className="text-blue-300 text-sm">{formatDate(item.date)}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleEditNews(item)}
                      className="px-4 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteNews(item.id)}
                      className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREERS */}
        {activeTab === "careers" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <form onSubmit={handleCareerSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">
                {editingCareerId ? "✏️ Edit Career" : "➕ Add Career"}
              </h3>

              <input
                type="text"
                value={careerForm.title}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, title: e.target.value })
                }
                required
                placeholder="Job Title"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
              />

              <input
                type="text"
                value={careerForm.location}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, location: e.target.value })
                }
                required
                placeholder="Location"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
              />

              <textarea
                value={careerForm.description}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, description: e.target.value })
                }
                required
                rows="5"
                placeholder="Job Description"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
              />

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                {editingCareerId ? "💾 Update Career" : "➕ Add Career"}
              </button>
            </form>

            <div className="space-y-4">
              {careers.map((job) => (
                <div key={job.id} className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div>
                    <span className="text-white font-semibold text-lg">{job.title}</span>
                    <p className="text-blue-300 text-sm">📍 {job.location}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleEditCareer(job)}
                      className="px-4 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCareer(job.id)}
                      className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === "attendance" && (
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* FILTER SECTION */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Filter Attendance
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
                <button
                  onClick={() => setFilterType('today')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    filterType === 'today'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  📅 Today
                </button>
                <button
                  onClick={() => setFilterType('week')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    filterType === 'week'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  📆 This Week
                </button>
                <button
                  onClick={() => setFilterType('month')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    filterType === 'month'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  📊 Month
                </button>
                <button
                  onClick={() => setFilterType('year')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    filterType === 'year'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  📈 Year
                </button>
                <button
                  onClick={() => setFilterType('custom')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    filterType === 'custom'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  🎯 Custom
                </button>
                <button
                  onClick={() => setFilterType('all')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    filterType === 'all'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  📋 All Time
                </button>
              </div>

              {/* Additional filter controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filterType === 'month' && (
                  <>
                    <div>
                      <label className="text-blue-300 text-sm mb-2 block">Month</label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                      >
                        {['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                          <option key={index} value={index + 1}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-blue-300 text-sm mb-2 block">Year</label>
                      <input
                        type="number"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                        min="2020"
                        max="2030"
                      />
                    </div>
                  </>
                )}

                {filterType === 'year' && (
                  <div>
                    <label className="text-blue-300 text-sm mb-2 block">Year</label>
                    <input
                      type="number"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                      min="2020"
                      max="2030"
                    />
                  </div>
                )}

                {filterType === 'custom' && (
                  <>
                    <div>
                      <label className="text-blue-300 text-sm mb-2 block">Start Date</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-blue-300 text-sm mb-2 block">End Date</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-300 text-sm mb-1">Total Employees</p>
                    <p className="text-4xl font-bold text-white">{filteredStats.total}</p>
                  </div>
                  <div className="w-16 h-16 bg-cyan-500/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm mb-1">Present</p>
                    <p className="text-4xl font-bold text-white">{filteredStats.present}</p>
                  </div>
                  <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-300 text-sm mb-1">Incomplete</p>
                    <p className="text-4xl font-bold text-white">{filteredStats.incomplete}</p>
                  </div>
                  <div className="w-16 h-16 bg-yellow-500/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">⚠️</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-300 text-sm mb-1">Absent</p>
                    <p className="text-4xl font-bold text-white">{filteredStats.absent}</p>
                  </div>
                  <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">❌</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Chart (Visual Bar Chart) */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                📊 {filterType === 'today' ? "Today's" : "Filtered"} Attendance Chart
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-green-300 font-semibold">Present</span>
                    <span className="text-white">{filteredStats.present} / {filteredStats.total}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
                      style={{ width: `${(filteredStats.present / filteredStats.total * 100) || 0}%` }}
                    >
                      {filteredStats.present > 0 && (
                        <span className="text-white text-xs font-bold">
                          {((filteredStats.present / filteredStats.total * 100) || 0).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-yellow-300 font-semibold">Incomplete</span>
                    <span className="text-white">{filteredStats.incomplete} / {filteredStats.total}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
                      style={{ width: `${(filteredStats.incomplete / filteredStats.total * 100) || 0}%` }}
                    >
                      {filteredStats.incomplete > 0 && (
                        <span className="text-white text-xs font-bold">
                          {((filteredStats.incomplete / filteredStats.total * 100) || 0).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-red-300 font-semibold">Absent</span>
                    <span className="text-white">{filteredStats.absent} / {filteredStats.total}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
                      style={{ width: `${(filteredStats.absent / filteredStats.total * 100) || 0}%` }}
                    >
                      {filteredStats.absent > 0 && (
                        <span className="text-white text-xs font-bold">
                          {((filteredStats.absent / filteredStats.total * 100) || 0).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Employees Attendance Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">📋 All Employees Attendance</h3>
                <button
                  onClick={loadAllAttendance}
                  disabled={loadingAttendance}
                  className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 rounded-lg hover:bg-cyan-600/30 transition-all duration-300 disabled:opacity-50"
                >
                  {loadingAttendance ? "🔄 Loading..." : "🔄 Refresh"}
                </button>
              </div>

              {loadingAttendance ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                  <p className="text-blue-300 mt-4">Loading attendance data...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Employee ID</th>
                        <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Name</th>
                        <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Total Records</th>
                        <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Present Days</th>
                        <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Attendance %</th>
                        <th className="text-left py-4 px-4 text-cyan-300 font-semibold">Today's Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allAttendance.map(({ employee, records }) => {
                        const filteredRecords = filterRecordsByDateRange(records);
                        const presentDays = filteredRecords.filter(r => r.in_time && r.out_time).length;
                        const todayStatusData = getTodayStatus(records);

                        return (
                          <tr key={employee.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                            <td className="py-4 px-4 text-blue-300 font-mono">{employee.id}</td>
                            <td className="py-4 px-4 text-white font-semibold">{employee.name}</td>
                            <td className="py-4 px-4 text-slate-300">{filteredRecords.length}</td>
                            <td className="py-4 px-4 text-green-400 font-semibold">{presentDays}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-slate-700 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full"
                                    style={{ width: `${getAttendancePercentage(records)}%` }}
                                  ></div>
                                </div>
                                <span className="text-cyan-400 font-semibold text-sm">
                                  {getAttendancePercentage(records)}%
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 bg-${todayStatusData.color}-500/20 border border-${todayStatusData.color}-500/50 text-${todayStatusData.color}-300 rounded-full text-sm`}>
                                {todayStatusData.status === 'present' && '✅'} 
                                {todayStatusData.status === 'incomplete' && '⚠️'} 
                                {todayStatusData.status === 'absent' && '❌'} 
                                {todayStatusData.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Individual Employee Details (Expandable) */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">📅 Detailed Attendance Records</h3>
              
              <div className="space-y-4">
                {allAttendance.map(({ employee, records }) => {
                  const filteredRecords = filterRecordsByDateRange(records);
                  const presentDays = filteredRecords.filter(r => r.in_time && r.out_time).length;
                  
                  return (
                    <details key={employee.id} className="bg-slate-700/50 rounded-xl border border-cyan-500/20">
                      <summary className="cursor-pointer p-4 hover:bg-slate-700 rounded-xl transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-white font-semibold text-lg">{employee.name}</span>
                            <span className="text-blue-300 text-sm ml-3">ID: {employee.id}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-cyan-400 font-semibold">
                              {presentDays} / {filteredRecords.length} days
                            </span>
                            <span className="text-slate-400">▼</span>
                          </div>
                        </div>
                      </summary>
                      
                      <div className="p-4 border-t border-slate-600">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-600">
                                <th className="text-left py-2 px-3 text-blue-300 text-sm">Date</th>
                                <th className="text-left py-2 px-3 text-blue-300 text-sm">IN Time</th>
                                <th className="text-left py-2 px-3 text-blue-300 text-sm">OUT Time</th>
                                <th className="text-left py-2 px-3 text-blue-300 text-sm">Total Hours</th>
                                <th className="text-left py-2 px-3 text-blue-300 text-sm">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredRecords.length === 0 ? (
                                <tr>
                                  <td colSpan="5" className="text-center py-4 text-slate-400">
                                    No attendance records for selected period
                                  </td>
                                </tr>
                              ) : (
                                filteredRecords.map((record) => (
                                  <tr key={record.id} className="border-b border-slate-600/50 hover:bg-slate-600/30 transition-colors">
                                    <td className="py-2 px-3 text-white text-sm">{formatDate(record.date)}</td>
                                    <td className="py-2 px-3 text-cyan-400 font-mono text-sm">{formatTime(record.in_time)}</td>
                                    <td className="py-2 px-3 text-blue-400 font-mono text-sm">{formatTime(record.out_time)}</td>
                                    <td className="py-2 px-3 text-purple-400 font-mono text-sm">{calculateTotalHours(record.in_time, record.out_time)}</td>
                                    <td className="py-2 px-3">
                                      {record.in_time && record.out_time ? (
                                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-xs">
                                          Present
                                        </span>
                                      ) : record.in_time ? (
                                        <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full text-xs">
                                          Incomplete
                                        </span>
                                      ) : (
                                        <span className="px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-xs">
                                          Absent
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;