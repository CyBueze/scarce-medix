import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      
      <Navbar />
      <div className="px-4 pt-8">
        <main id="content">
          <Outlet /> {/* This is where index.tsx will render */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
