// // src/components/EmployeeDashboard.jsx - UPDATED WITH GOOGLE SHEETS BUTTONS
// import { useState, useEffect } from 'react';
// import API from '../api';

// const EmployeeDashboard = ({ loggedInEmployee, setCurrentPage }) => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [locationStatus, setLocationStatus] = useState('');
//   const [todayAttendance, setTodayAttendance] = useState(null);
  
//   // Filter states
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [showAllRecords, setShowAllRecords] = useState(false);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   // Google Sheets Links
//   const googleSheetsLinks = [
//     {
//       name: "Attendance of Employees",
//       icon: "📊",
//       url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
//     },
//     {
//       name: "Project Report",
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
//     }
//   ];

//   useEffect(() => {
//     fetchAttendance();
//   }, [selectedMonth, selectedYear, showAllRecords]);

//   const fetchAttendance = async () => {
//     try {
//       let url = `/attendance/${loggedInEmployee.id}`;
      
//       if (!showAllRecords) {
//         url += `?month=${selectedMonth}&year=${selectedYear}`;
//       }

//       const response = await API.get(url);
//       setAttendanceRecords(response.data);
      
//       // Get today's date in YYYY-MM-DD format
//       const today = new Date();
//       const todayStr = today.toISOString().split('T')[0];
      
//       console.log('Looking for date:', todayStr);
//       console.log('All records:', response.data);
      
//       // Find today's record with flexible date matching
//       const todayRecord = response.data.find(record => {
//         if (!record.date) return false;
        
//         // Handle different date formats
//         let recordDateStr;
//         if (typeof record.date === 'string') {
//           recordDateStr = record.date.split('T')[0]; // Handle ISO format
//         } else if (record.date instanceof Date) {
//           recordDateStr = record.date.toISOString().split('T')[0];
//         } else {
//           recordDateStr = String(record.date).split('T')[0];
//         }
        
//         console.log('Comparing:', recordDateStr, 'with', todayStr);
//         return recordDateStr === todayStr;
//       });
      
//       console.log('Today record found:', todayRecord);
//       setTodayAttendance(todayRecord || null);
//     } catch (error) {
//       console.error('Error fetching attendance:', error);
//     }
//   };

//   const getCurrentLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported by your browser'));
//         return;
//       }

//       setLocationStatus('Getting your location...');

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => {
//           let errorMessage = 'Unable to retrieve your location';
          
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage = 'Location permission denied. Please enable location access.';
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage = 'Location information is unavailable.';
//               break;
//             case error.TIMEOUT:
//               errorMessage = 'Location request timed out.';
//               break;
//           }
          
//           reject(new Error(errorMessage));
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0,
//         }
//       );
//     });
//   };

//   const handleMarkIn = async () => {
//     setMessage('');
//     setError('');
//     setLoading(true);

//     try {
//       const location = await getCurrentLocation();
//       setLocationStatus('Verifying location...');

//       const formData = new FormData();
//       formData.append('employee_id', loggedInEmployee.id);
//       formData.append('latitude', location.latitude);
//       formData.append('longitude', location.longitude);

//       const response = await API.post('/attendance/mark-in', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage(`✓ IN time marked successfully at ${response.data.time} (${response.data.location})`);
//       setLocationStatus('');
      
//       // Wait a moment then refresh attendance
//       setTimeout(() => {
//         fetchAttendance();
//       }, 1000);
//     } catch (err) {
//       console.error('Mark in error:', err);
//       const errorMsg = err.response?.data?.detail || err.message || 'Failed to mark attendance';
//       setError(errorMsg);
//       setLocationStatus('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkOut = async () => {
//     setMessage('');
//     setError('');
//     setLoading(true);

//     try {
//       const location = await getCurrentLocation();
//       setLocationStatus('Verifying location...');

//       const formData = new FormData();
//       formData.append('employee_id', loggedInEmployee.id);
//       formData.append('latitude', location.latitude);
//       formData.append('longitude', location.longitude);

//       const response = await API.post('/attendance/mark-out', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage(`✓ OUT time marked successfully at ${response.data.time} (${response.data.location})`);
//       setLocationStatus('');
      
//       // Wait a moment then refresh attendance
//       setTimeout(() => {
//         fetchAttendance();
//       }, 1000);
//     } catch (err) {
//       console.error('Mark out error:', err);
//       const errorMsg = err.response?.data?.detail || err.message || 'Failed to mark exit';
//       setError(errorMsg);
//       setLocationStatus('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     setCurrentPage('employee-portal');
//   };

//   const handleOpenSheet = (url) => {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   const calculateTotalHours = (inTime, outTime) => {
//     if (!inTime || !outTime) return '-';
    
//     const start = new Date(inTime);
//     const end = new Date(outTime);
//     const diffMs = end - start;
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${diffHours}h ${diffMinutes}m`;
//   };

//   const formatTime = (datetime) => {
//     if (!datetime) return '-';
//     const date = new Date(datetime);
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: true 
//     });
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const calculateStats = () => {
//     // Only count as present if BOTH in_time AND out_time are marked
//     const totalDays = attendanceRecords.length;
//     const presentDays = attendanceRecords.filter(r => r.in_time && r.out_time).length;
//     const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
    
//     return { totalDays, presentDays, percentage };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">
//               Welcome, {loggedInEmployee.name}!
//             </h1>
//             <p className="text-blue-300">Employee ID: {loggedInEmployee.id}</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Google Sheets Quick Links */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 mb-8">
//           <h2 className="text-2xl font-bold text-white mb-4">Quick Links</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {googleSheetsLinks.map((link, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleOpenSheet(link.url)}
//                 className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 hover:bg-slate-700 transition-all duration-300 group"
//               >
//                 <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
//                   {link.icon}
//                 </span>
//                 <span className="text-white text-sm text-center">
//                   {link.name}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Attendance Marking Section */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 mb-8">
//           <h2 className="text-2xl font-bold text-white mb-4">Mark Attendance</h2>
          
//           {/* Messages */}
//           {locationStatus && (
//             <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
//               <p className="text-blue-300 text-center">{locationStatus}</p>
//             </div>
//           )}

//           {message && (
//             <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
//               <p className="text-green-300 text-center">{message}</p>
//             </div>
//           )}

//           {error && (
//             <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
//               <p className="text-red-300 text-center">{error}</p>
//             </div>
//           )}

//           {/* Today's Status */}
//           <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
//             <h3 className="text-white font-semibold mb-3">Today's Status</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-slate-400 text-sm mb-1">IN Time</p>
//                 <p className="text-xl font-bold text-cyan-400">
//                   {todayAttendance?.in_time ? formatTime(todayAttendance.in_time) : 'Not marked'}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-slate-400 text-sm mb-1">OUT Time</p>
//                 <p className="text-xl font-bold text-blue-400">
//                   {todayAttendance?.out_time ? formatTime(todayAttendance.out_time) : 'Not marked'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-2 gap-4">
//             <button
//               onClick={handleMarkIn}
//               disabled={loading || (todayAttendance && todayAttendance.in_time)}
//               className="py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//               </svg>
//               Mark IN
//             </button>

//             <button
//               onClick={handleMarkOut}
//               disabled={loading || !todayAttendance || !todayAttendance.in_time || todayAttendance.out_time}
//               className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Mark OUT
//             </button>
//           </div>

//           {/* Location Info */}
//           <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
//             <p className="text-yellow-300 text-sm text-center">
//               ⚠️ You must be at the office location to mark attendance
//             </p>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-cyan-300 text-sm mb-1">Days Present</p>
//                 <p className="text-4xl font-bold text-white">{stats.presentDays}</p>
//                 <p className="text-cyan-400 text-xs mt-1">Both IN & OUT marked</p>
//               </div>
//               <div className="w-16 h-16 bg-cyan-500/30 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-300 text-sm mb-1">Total Days</p>
//                 <p className="text-4xl font-bold text-white">{stats.totalDays}</p>
//               </div>
//               <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-300 text-sm mb-1">Attendance %</p>
//                 <p className="text-4xl font-bold text-white">{stats.percentage}%</p>
//               </div>
//               <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Attendance History */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-white">Attendance History</h2>
            
//             {/* Filters */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowAllRecords(!showAllRecords)}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   showAllRecords
//                     ? 'bg-cyan-500 text-white'
//                     : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
//                 }`}
//               >
//                 {showAllRecords ? 'Show Filtered' : 'Show All'}
//               </button>

//               {!showAllRecords && (
//                 <>
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                     className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {months.map((month, index) => (
//                       <option key={index} value={index + 1}>
//                         {month}
//                       </option>
//                     ))}
//                   </select>

//                   <input
//                     type="number"
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                     className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
//                     min="2020"
//                     max="2030"
//                   />
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Attendance Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-slate-700">
//                   <th className="text-left py-3 px-4 text-blue-300 font-semibold">Date</th>
//                   <th className="text-left py-3 px-4 text-blue-300 font-semibold">Day</th>
//                   <th className="text-left py-3 px-4 text-blue-300 font-semibold">IN Time</th>
//                   <th className="text-left py-3 px-4 text-blue-300 font-semibold">OUT Time</th>
//                   <th className="text-left py-3 px-4 text-blue-300 font-semibold">Total Hours</th>
//                   <th className="text-left py-3 px-4 text-blue-300 font-semibold">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendanceRecords.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-center py-8 text-slate-400">
//                       No attendance records found
//                     </td>
//                   </tr>
//                 ) : (
//                   attendanceRecords.map((record) => (
//                     <tr key={record.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
//                       <td className="py-3 px-4 text-white">{formatDate(record.date)}</td>
//                       <td className="py-3 px-4 text-slate-300">
//                         {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
//                       </td>
//                       <td className="py-3 px-4 text-cyan-400 font-mono">
//                         {formatTime(record.in_time)}
//                       </td>
//                       <td className="py-3 px-4 text-blue-400 font-mono">
//                         {formatTime(record.out_time)}
//                       </td>
//                       <td className="py-3 px-4 text-purple-400 font-mono">
//                         {calculateTotalHours(record.in_time, record.out_time)}
//                       </td>
//                       <td className="py-3 px-4">
//                         {/* ONLY SHOW PRESENT IF BOTH IN AND OUT ARE MARKED */}
//                         {record.in_time && record.out_time ? (
//                           <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-sm">
//                             Present
//                           </span>
//                         ) : record.in_time ? (
//                           <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full text-sm">
//                             Incomplete
//                           </span>
//                         ) : (
//                           <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-sm">
//                             Absent
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;




// src/components/EmployeeDashboard.jsx - FIXED DATE MATCHING LOGIC
import { useState, useEffect } from 'react';
import API from '../api';

const EmployeeDashboard = ({ loggedInEmployee, setCurrentPage }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [todayAttendance, setTodayAttendance] = useState(null);
  
  // Filter states
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAllRecords, setShowAllRecords] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Google Sheets Links
  const googleSheetsLinks = [
    {
      name: "Attendance of Employees",
      icon: "📊",
      url: "https://docs.google.com/spreadsheets/d/1-oiFU6P8kYpLpaoftueeZcvEAHUN4qkRIOcCHU3xpQg/edit?pli=1&gid=0#gid=0"
    },
    {
      name: "Project Report",
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
    }
  ];

  useEffect(() => {
    fetchAttendance();
  }, [selectedMonth, selectedYear, showAllRecords]);

  // Helper function to normalize dates to YYYY-MM-DD format in local timezone
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

  const fetchAttendance = async () => {
    try {
      let url = `/attendance/${loggedInEmployee.id}`;
      
      if (!showAllRecords) {
        url += `?month=${selectedMonth}&year=${selectedYear}`;
      }

      const response = await API.get(url);
      setAttendanceRecords(response.data);
      
      // Get today's date in local timezone (YYYY-MM-DD format)
      const today = new Date();
      const todayStr = normalizeDate(today);
      
      console.log('🔍 Looking for today\'s date:', todayStr);
      console.log('📊 Total records received:', response.data.length);
      
      // Find today's record with improved date matching
      const todayRecord = response.data.find(record => {
        if (!record.date) {
          console.log('⚠️ Record has no date:', record);
          return false;
        }
        
        const recordDateStr = normalizeDate(record.date);
        
        if (!recordDateStr) {
          console.log('⚠️ Could not normalize record date:', record.date);
          return false;
        }
        
        const isMatch = recordDateStr === todayStr;
        
        if (isMatch) {
          console.log('✅ MATCH FOUND:', {
            recordDate: recordDateStr,
            todayDate: todayStr,
            record: record
          });
        }
        
        return isMatch;
      });
      
      if (todayRecord) {
        console.log('✅ Today\'s attendance found:', {
          date: todayRecord.date,
          in_time: todayRecord.in_time,
          out_time: todayRecord.out_time
        });
      } else {
        console.log('❌ No attendance record found for today');
        console.log('Available dates:', response.data.map(r => ({
          original: r.date,
          normalized: normalizeDate(r.date)
        })));
      }
      
      setTodayAttendance(todayRecord || null);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      setLocationStatus('Getting your location...');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleMarkIn = async () => {
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const location = await getCurrentLocation();
      setLocationStatus('Verifying location...');

      const formData = new FormData();
      formData.append('employee_id', loggedInEmployee.id);
      formData.append('latitude', location.latitude);
      formData.append('longitude', location.longitude);

      const response = await API.post('/attendance/mark-in', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`✓ IN time marked successfully at ${response.data.time} (${response.data.location})`);
      setLocationStatus('');
      
      // Wait a moment then refresh attendance
      setTimeout(() => {
        fetchAttendance();
      }, 1000);
    } catch (err) {
      console.error('Mark in error:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to mark attendance';
      setError(errorMsg);
      setLocationStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkOut = async () => {
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const location = await getCurrentLocation();
      setLocationStatus('Verifying location...');

      const formData = new FormData();
      formData.append('employee_id', loggedInEmployee.id);
      formData.append('latitude', location.latitude);
      formData.append('longitude', location.longitude);

      const response = await API.post('/attendance/mark-out', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`✓ OUT time marked successfully at ${response.data.time} (${response.data.location})`);
      setLocationStatus('');
      
      // Wait a moment then refresh attendance
      setTimeout(() => {
        fetchAttendance();
      }, 1000);
    } catch (err) {
      console.error('Mark out error:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to mark exit';
      setError(errorMsg);
      setLocationStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentPage('employee-portal');
  };

  const handleOpenSheet = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const calculateTotalHours = (inTime, outTime) => {
    if (!inTime || !outTime) return '-';
    
    const start = new Date(inTime);
    const end = new Date(outTime);
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMinutes}m`;
  };

  const formatTime = (datetime) => {
    if (!datetime) return '-';
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateStats = () => {
    // Only count as present if BOTH in_time AND out_time are marked
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(r => r.in_time && r.out_time).length;
    const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
    
    return { totalDays, presentDays, percentage };
  };

  const stats = calculateStats();

  // Debug info to help troubleshoot button state
  console.log('🔧 Button State Debug:', {
    loading,
    todayAttendance,
    hasInTime: todayAttendance?.in_time,
    hasOutTime: todayAttendance?.out_time,
    markOutDisabled: loading || !todayAttendance || !todayAttendance?.in_time || todayAttendance?.out_time
  });

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome, {loggedInEmployee.name}!
            </h1>
            <p className="text-blue-300">Employee ID: {loggedInEmployee.id}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Google Sheets Quick Links */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {googleSheetsLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleOpenSheet(link.url)}
                className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 hover:bg-slate-700 transition-all duration-300 group"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <span className="text-white text-sm text-center">
                  {link.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Attendance Marking Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Mark Attendance</h2>
          
          {/* Messages */}
          {locationStatus && (
            <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <p className="text-blue-300 text-center">{locationStatus}</p>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-center">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-center">{error}</p>
            </div>
          )}

          {/* Today's Status */}
          <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
            <h3 className="text-white font-semibold mb-3">Today's Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">IN Time</p>
                <p className="text-xl font-bold text-cyan-400">
                  {todayAttendance?.in_time ? formatTime(todayAttendance.in_time) : 'Not marked'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">OUT Time</p>
                <p className="text-xl font-bold text-blue-400">
                  {todayAttendance?.out_time ? formatTime(todayAttendance.out_time) : 'Not marked'}
                </p>
              </div>
            </div>
            
            {/* Debug Info Display (remove in production) */}
            <div className="mt-4 p-3 bg-slate-800 rounded text-xs text-slate-400">
              <p><strong>Debug:</strong> Today Record: {todayAttendance ? 'Found ✓' : 'Not Found ✗'}</p>
              {todayAttendance && (
                <>
                  <p>IN: {todayAttendance.in_time ? '✓' : '✗'} | OUT: {todayAttendance.out_time ? '✓' : '✗'}</p>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleMarkIn}
              disabled={loading || (todayAttendance && todayAttendance.in_time)}
              className="py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Mark IN
              {todayAttendance?.in_time && <span className="text-xs">(Done)</span>}
            </button>

            <button
              onClick={handleMarkOut}
              disabled={loading || !todayAttendance || !todayAttendance.in_time || todayAttendance.out_time}
              className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Mark OUT
              {todayAttendance?.out_time && <span className="text-xs">(Done)</span>}
            </button>
          </div>

          {/* Location Info */}
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 text-sm text-center">
              ⚠️ You must be at the office location to mark attendance
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-300 text-sm mb-1">Days Present</p>
                <p className="text-4xl font-bold text-white">{stats.presentDays}</p>
                <p className="text-cyan-400 text-xs mt-1">Both IN & OUT marked</p>
              </div>
              <div className="w-16 h-16 bg-cyan-500/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm mb-1">Total Days</p>
                <p className="text-4xl font-bold text-white">{stats.totalDays}</p>
              </div>
              <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm mb-1">Attendance %</p>
                <p className="text-4xl font-bold text-white">{stats.percentage}%</p>
              </div>
              <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Attendance History</h2>
            
            {/* Filters */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowAllRecords(!showAllRecords)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showAllRecords
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {showAllRecords ? 'Show Filtered' : 'Show All'}
              </button>

              {!showAllRecords && (
                <>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                    min="2020"
                    max="2030"
                  />
                </>
              )}
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">Day</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">IN Time</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">OUT Time</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">Total Hours</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-400">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendanceRecords.map((record) => (
                    <tr key={record.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 text-white">{formatDate(record.date)}</td>
                      <td className="py-3 px-4 text-slate-300">
                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </td>
                      <td className="py-3 px-4 text-cyan-400 font-mono">
                        {formatTime(record.in_time)}
                      </td>
                      <td className="py-3 px-4 text-blue-400 font-mono">
                        {formatTime(record.out_time)}
                      </td>
                      <td className="py-3 px-4 text-purple-400 font-mono">
                        {calculateTotalHours(record.in_time, record.out_time)}
                      </td>
                      <td className="py-3 px-4">
                        {/* ONLY SHOW PRESENT IF BOTH IN AND OUT ARE MARKED */}
                        {record.in_time && record.out_time ? (
                          <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-sm">
                            Present
                          </span>
                        ) : record.in_time ? (
                          <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full text-sm">
                            Incomplete
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-sm">
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
      </div>
    </div>
  );
};

export default EmployeeDashboard;