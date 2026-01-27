// // src/App.jsx - WITH DEBUG LOGS
// import { useState, useEffect } from 'react';
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import ProgressSection from './components/ProgressSection';
// import WhyChooseUs from './components/WhyChooseUs';
// import Certifications from './components/Certifications';
// import Awards from './components/Awards';
// import Clients from './components/Clients';
// import Locations from './components/Locations';
// import ServicesPage from './components/ServicesPage';
// import AboutPage from './components/AboutPage';
// import ContactPage from './components/ContactPage';
// import PortalPage from './components/PortalPage';
// import AdminDashboard from './components/AdminDashboard';
// import NewsEventsPage from './components/NewsEventsPage';
// import CareersPage from './components/CareersPage';
// import Footer from './components/Footer';
// import AdminLoginPage from "./components/AdminLoginPage";
// import ForgotPasswordPage from "./components/ForgotPasswordPage";
// import ResetPasswordPage from "./components/PasswordResetPage";

// function App() {
//   // Initialize currentPage based on URL parameters
//   const getInitialPage = () => {
//     console.log('🔍 Checking URL for parameters...');
//     console.log('Full URL:', window.location.href);
//     console.log('Search params:', window.location.search);
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');
    
//     console.log('Token from URL:', token);
    
//     if (token) {
//       console.log('✅ Token found! Setting page to reset-password');
//       return 'reset-password';
//     }
    
//     console.log('❌ No token found. Setting page to home');
//     return 'home';
//   };

//   const [currentPage, setCurrentPage] = useState(getInitialPage);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [resetToken, setResetToken] = useState(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('token');
//   });
  
//   // State for admin-added content
//   const [newsEvents, setNewsEvents] = useState([]);
//   const [careers, setCareers] = useState([]);

//   // Extract token from URL on component mount
//   useEffect(() => {
//     console.log('🚀 App mounted, checking for token...');
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');
    
//     if (token) {
//       console.log('✅ Token found in useEffect:', token);
//       setResetToken(token);
//       setCurrentPage('reset-password');
//       // Clean up URL (remove token from address bar)
//       window.history.replaceState({}, document.title, window.location.pathname);
//     } else {
//       console.log('❌ No token in useEffect');
//     }
//   }, []);

//   // Debug: Log whenever currentPage changes
//   useEffect(() => {
//     console.log('📄 Current page changed to:', currentPage);
//   }, [currentPage]);

//   // Smooth scroll to top when changing pages
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-slate-900">
//       <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
//       {/* Home Page with Smooth Scroll Snapping */}
//       {currentPage === 'home' && (
//         <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
//           <div className="snap-start snap-always">
//             <HeroSection />
//           </div>
//           <div className="snap-start snap-always">
//             <ProgressSection />
//           </div>
//           <div className="snap-start snap-always">
//             <WhyChooseUs />
//           </div>
//           <div className="snap-start snap-always">
//             <Certifications />
//           </div>
//           <div className="snap-start snap-always">
//             <Awards />
//           </div>
//           <div className="snap-start snap-always">
//             <Clients />
//           </div>
//           <div className="snap-start snap-always">
//             <Locations />
//           </div>
//         </div>
//       )}

//       {/* About Page */}
//       {currentPage === 'about' && <AboutPage />}

//       {/* Services Page */}
//       {currentPage === 'services' && <ServicesPage />}

//       {/* Contact Page */}
//       {currentPage === 'contact' && <ContactPage />}

//       {/* Portal Page */}
//       {currentPage === 'portal' && (
//         <PortalPage 
//           setCurrentPage={setCurrentPage} 
//           setIsAdmin={setIsAdmin} 
//         />
//       )}
//       {currentPage === "admin-login" && (
//         <AdminLoginPage setCurrentPage={setCurrentPage} />
//       )}

//       {currentPage === "forgot-password" && (
//         <ForgotPasswordPage setCurrentPage={setCurrentPage} />
//       )}

//       {currentPage === "reset-password" && (
//         <>
//           {console.log('🔐 Rendering ResetPasswordPage with token:', resetToken)}
//           <ResetPasswordPage 
//             setCurrentPage={setCurrentPage} 
//             token={resetToken}
//           />
//         </>
//       )}

//       {/* Admin Dashboard */}
//       {currentPage === 'admin-dashboard' && (
//         <AdminDashboard 
//           newsEvents={newsEvents}
//           setNewsEvents={setNewsEvents}
//           careers={careers}
//           setCareers={setCareers}
//         />
//       )}

//       {/* Employee Dashboard - Placeholder */}
//       {currentPage === 'employee-dashboard' && (
//         <div className="min-h-screen flex items-center justify-center pt-32">
//           <div className="text-center">
//             <div className="bg-slate-800/50 backdrop-blur-sm p-12 rounded-2xl border border-blue-500/20 max-w-2xl">
//               <svg className="w-24 h-24 mx-auto text-blue-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               <h1 className="text-4xl font-bold text-white mb-4">Employee Dashboard</h1>
//               <p className="text-blue-200 mb-6">Access your documents, schedules, and resources</p>
//               <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-400">
//                 Coming Soon
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* News & Events Page */}
//       {currentPage === 'news' && <NewsEventsPage newsEvents={newsEvents} />}

//       {/* Careers Page */}
//       {currentPage === 'careers' && <CareersPage careers={careers} />}
      
//       {/* Footer - Only show on non-home pages */}
//       {currentPage !== 'home' && <Footer />}

//       {/* Scroll to Top Button - Only show on non-home pages */}
//       {currentPage !== 'home' && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 z-50 group"
//           aria-label="Scroll to top"
//         >
//           <svg 
//             className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//           </svg>
//         </button>
//       )}

//       {/* Add global scroll behavior styles */}
//       <style jsx="true" global="true">{`
//         /* Smooth scrolling for the entire app */
//         html {
//           scroll-behavior: smooth;
//         }

//         /* Hide scrollbar for snap container while keeping functionality */
//         .snap-y::-webkit-scrollbar {
//           width: 8px;
//         }

//         .snap-y::-webkit-scrollbar-track {
//           background: rgba(15, 23, 42, 0.5);
//         }

//         .snap-y::-webkit-scrollbar-thumb {
//           background: rgba(56, 189, 248, 0.3);
//           border-radius: 4px;
//         }

//         .snap-y::-webkit-scrollbar-thumb:hover {
//           background: rgba(56, 189, 248, 0.5);
//         }

//         /* Ensure sections take full viewport height */
//         .snap-start > * {
//           min-height: 100vh;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;


// src/App.jsx - INTEGRATED WITH EMPLOYEE PORTAL
import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProgressSection from './components/ProgressSection';
import WhyChooseUs from './components/WhyChooseUs';
import Certifications from './components/Certifications';
import Awards from './components/Awards';
import Clients from './components/Clients';
import Locations from './components/Locations';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PortalPage from './components/PortalPage';
import AdminDashboard from './components/AdminDashboard';
import NewsEventsPage from './components/NewsEventsPage';
import CareersPage from './components/CareersPage';
import Footer from './components/Footer';
import AdminLoginPage from "./components/AdminLoginPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/PasswordResetPage";

// Employee Portal Components
import EmployeePortalPage from "./components/EmployeePortalPage";
import EmployeeLoginPage from "./components/EmployeeLoginPage";
import EmployeeForgotPasswordPage from "./components/EmployeeForgotPasswordPage";
import EmployeeResetPasswordPage from "./components/EmployeeResetPasswordPage";
import EmployeeDashboard from "./components/EmployeeDashboard";

function App() {
  // Initialize currentPage based on URL parameters
  const getInitialPage = () => {
    console.log('🔍 Checking URL for parameters...');
    console.log('Full URL:', window.location.href);
    console.log('Search params:', window.location.search);
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    
    console.log('Token from URL:', token);
    console.log('Type from URL:', type);
    
    if (token) {
      if (type === 'employee') {
        console.log('✅ Employee reset token found! Setting page to employee-reset-password');
        return 'employee-reset-password';
      }
      console.log('✅ Admin reset token found! Setting page to reset-password');
      return 'reset-password';
    }
    
    console.log('❌ No token found. Setting page to home');
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resetToken, setResetToken] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  });
  
  // State for admin-added content
  const [newsEvents, setNewsEvents] = useState([]);
  const [careers, setCareers] = useState([]);

  // Employee state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  // Extract token from URL on component mount
  useEffect(() => {
    console.log('🚀 App mounted, checking for token...');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    
    if (token) {
      console.log('✅ Token found in useEffect:', token);
      setResetToken(token);
      
      if (type === 'employee') {
        setCurrentPage('employee-reset-password');
      } else {
        setCurrentPage('reset-password');
      }
      
      // Clean up URL (remove token from address bar)
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('❌ No token in useEffect');
    }
  }, []);

  // Debug: Log whenever currentPage changes
  useEffect(() => {
    console.log('📄 Current page changed to:', currentPage);
  }, [currentPage]);

  // Smooth scroll to top when changing pages
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Home Page with Smooth Scroll Snapping */}
      {currentPage === 'home' && (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
          <div className="snap-start snap-always">
            <HeroSection />
          </div>
          <div className="snap-start snap-always">
            <ProgressSection />
          </div>
          <div className="snap-start snap-always">
            <WhyChooseUs />
          </div>
          <div className="snap-start snap-always">
            <Certifications />
          </div>
          <div className="snap-start snap-always">
            <Awards />
          </div>
          <div className="snap-start snap-always">
            <Clients />
          </div>
          <div className="snap-start snap-always">
            <Locations />
          </div>
        </div>
      )}

      {/* About Page */}
      {currentPage === 'about' && <AboutPage />}

      {/* Services Page */}
      {currentPage === 'services' && <ServicesPage />}

      {/* Contact Page */}
      {currentPage === 'contact' && <ContactPage />}

      {/* Portal Page */}
      {currentPage === 'portal' && (
        <PortalPage 
          setCurrentPage={setCurrentPage} 
          setIsAdmin={setIsAdmin} 
        />
      )}

      {/* Admin Login Page */}
      {currentPage === "admin-login" && (
        <AdminLoginPage setCurrentPage={setCurrentPage} />
      )}

      {/* Admin Forgot Password */}
      {currentPage === "forgot-password" && (
        <ForgotPasswordPage setCurrentPage={setCurrentPage} />
      )}

      {/* Admin Reset Password */}
      {currentPage === "reset-password" && (
        <>
          {console.log('🔐 Rendering Admin ResetPasswordPage with token:', resetToken)}
          <ResetPasswordPage 
            setCurrentPage={setCurrentPage} 
            token={resetToken}
          />
        </>
      )}

      {/* Admin Dashboard */}
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard 
          newsEvents={newsEvents}
          setNewsEvents={setNewsEvents}
          careers={careers}
          setCareers={setCareers}
        />
      )}

      {/* Employee Portal Page - Select Employee */}
      {currentPage === 'employee-portal' && (
        <EmployeePortalPage 
          setCurrentPage={setCurrentPage}
          setSelectedEmployee={setSelectedEmployee}
        />
      )}

      {/* Employee Login Page */}
      {currentPage === 'employee-login' && (
        <EmployeeLoginPage 
          setCurrentPage={setCurrentPage}
          selectedEmployee={selectedEmployee}
          setLoggedInEmployee={setLoggedInEmployee}
        />
      )}

      {/* Employee Forgot Password */}
      {currentPage === 'employee-forgot-password' && (
        <EmployeeForgotPasswordPage 
          setCurrentPage={setCurrentPage}
          selectedEmployee={selectedEmployee}
        />
      )}

      {/* Employee Reset Password */}
      {currentPage === 'employee-reset-password' && (
        <>
          {console.log('🔐 Rendering Employee ResetPasswordPage with token:', resetToken)}
          <EmployeeResetPasswordPage 
            setCurrentPage={setCurrentPage}
            token={resetToken}
          />
        </>
      )}

      {/* Employee Dashboards - Separate dashboard for each employee */}
      {currentPage.startsWith('employee-dashboard-') && loggedInEmployee && (
        <EmployeeDashboard 
          loggedInEmployee={loggedInEmployee}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* News & Events Page */}
      {currentPage === 'news' && <NewsEventsPage newsEvents={newsEvents} />}

      {/* Careers Page */}
      {currentPage === 'careers' && <CareersPage careers={careers} />}
      
      {/* Footer - Only show on non-home pages */}
      {currentPage !== 'home' && <Footer />}

      {/* Scroll to Top Button - Only show on non-home pages */}
      {currentPage !== 'home' && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Add global scroll behavior styles */}
      <style jsx="true" global="true">{`
        /* Smooth scrolling for the entire app */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar for snap container while keeping functionality */
        .snap-y::-webkit-scrollbar {
          width: 8px;
        }

        .snap-y::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        .snap-y::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.3);
          border-radius: 4px;
        }

        .snap-y::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.5);
        }

        /* Ensure sections take full viewport height */
        .snap-start > * {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}

export default App;