// src/components/Footer.jsx
const Footer = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-blue-500/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              MAG MARINE SERVICES
            </h3>
            <p className="text-blue-200 mb-4 leading-relaxed">
              Your trusted partner in marine engineering, diving services, and maritime solutions.
              Committed to excellence, safety, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              { [
                { label: 'About Us', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Projects', id: 'projects' },
                { label: 'Careers', id: 'careers' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className="text-blue-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer bg-none border-none p-0"
                  >
                    {item.label}
                  </button>
                </li>
              )) }
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-blue-200">
              <li>Email: hello@magmarine.in</li>
              <li>Primary Number: 0484 312140</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-500/20 text-center text-blue-300">
          <p>&copy; {currentYear} Mag Marine Services Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;