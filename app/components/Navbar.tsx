import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center px-4 py-1 bg-white shadow sticky top-0 z-[100]">
      <div className="flex items-center">
        <Link to="/">
          <img 
            src="https://gr7ahin3tm.ufs.sh/f/gr7iLvdI7Oq1YiIaGK0bd45PIh8kNCAJFwQSMmtjV3qr2s0W" 
            alt="logo" 
            className="w-auto h-16 hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      <Link to="/" className="hover:opacity-70 transition-opacity">
        <h1 className="text-md font-semibold text-gray-800 tracking-wide">
          Scarce Medix
        </h1>
      </Link>
    </nav>
  );
}
