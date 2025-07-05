import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from './pages/Layout';
import Register from './pages/Register';
import StaffRegister from './pages/StaffRegister';
import UserActivate from './pages/UserActivate';
import Unauthorized from './pages/Unauthorized';
import SidebarLayout from './pages/SidebarLayout';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import RequestHome from './pages/requesthome';
import SpecalitiesQ from './pages/SpecalitiesQ';
import QRGen from './pages/QRGen';
import StaffAuth from './pages/StaffAuth';
//import api from './axiosService';
function App() {
  const [count, setCount] = useState(0)

//   api.interceptors.request.use(config => {
//   const token = sessionStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

  return (
    <>
    <BrowserRouter>
      <Routes>
           <Route path="/" element={<Home />} />          
          <Route path="/login/:id" element={<Login />} />          
          <Route path="/register" element={<Register />} />        
          <Route path="/StaffRegister" element={<StaffRegister />} />        
          <Route
          path="/adashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }/>
          <Route
          path="/stdashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          }/>
          <Route path="/sfdashboard" element={ <ProtectedRoute> <Layout><StaffDashboard /></Layout></ProtectedRoute>}/>
          <Route path="/UserActivate" element={ <ProtectedRoute><Layout><UserActivate /></Layout></ProtectedRoute>}/>
          <Route path="/requesthome" element={ <ProtectedRoute><Layout><RequestHome /></Layout></ProtectedRoute>}/>
          <Route path="/SpecalitiesQ" element={ <ProtectedRoute><Layout><SpecalitiesQ /></Layout></ProtectedRoute>}/>
          <Route path="/QRGen" element={ <ProtectedRoute><Layout><QRGen /></Layout></ProtectedRoute>}/>
          <Route path="/StaffAuth" element={ <ProtectedRoute><Layout><StaffAuth /></Layout></ProtectedRoute>}/>
        <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />        
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
