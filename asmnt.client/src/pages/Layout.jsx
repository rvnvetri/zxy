import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SidebarLayout from "./SidebarLayout";

export default function Layout({ children }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.name || payload.sub || "");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <Header></Header>
      {/* <header className="bg-primary text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Assessment Portal</h1>
        <div className="flex items-center gap-3">
          <span>{userName}</span>
          <button onClick={handleLogout} className="btn btn-sm btn-secondary">Logout</button>
        </div>
      </header> */}
      <div className="flex flex-1">        
        {/* Sidebar */}
        {/* <aside className="w-64 bg-base-200 p-4 hidden lg:block">
          <ul className="menu">
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Sticky Footer */}
      <footer className="bg-base-300 text-start p-4">
        © 2025 Assessment Portal - All rights reserved
      </footer>
    </div>
  );
}
