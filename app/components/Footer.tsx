import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-scarce-green-600 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <span className="text-xl font-semibold text-white">Scarce Medix</span>
            </div>
            <p className="text-sm leading-relaxed">
              Making the unavailable available — nationwide in Nigeria.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/inventory" className="hover:text-white transition">Search Inventory</Link></li>
              <li><Link to="/track" className="hover:text-white transition">Track Order</Link></li>
              <li><Link to="/upload" className="hover:text-white transition">Prescription Upload</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/nafdac" className="hover:text-white transition">NAFDAC Compliance</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition">
                <a href="mailto:contact@scarcemedix.com.ng">contact@scarcemedix.com.ng</a>
              </li>
              <li className="hover:text-white transition">
                <a href="tel:+2349161352715">+234 9161352715</a>
              </li>
              <li className="hover:text-white transition">
                <a href="tel:+2349022463512">+234 9022463512</a>
              </li>
              <li>Mon–Sat: 8am–8pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm">
          © {currentYear} Scarce Medix. All rights reserved. Licensed & Regulated.
        </div>
      </div>
    </footer>
  );
}
