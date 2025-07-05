// inside your Header or Navbar
import { useEffect, useState } from "react";
import UserAvatarDropdown from "./UserAvatarDropdown";
import api from "../axiosService";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");
    const [headerTitle, setHeaderTitle] = useState("");
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const getTitle=()=>{
      var path = location.pathname;      
      if(path.includes("/adashboard"))
      {        
        return "Dashboard";
      }
      else if(path.includes("/stdashboard"))
      {        
        return "Dashboard";
      }
      else if(path.includes("/sfdashboard"))
      {        
        return "Dashboard";
      }
      else if(path.includes("/sfdashboard"))
      {        
        return "Dashboard";
      }
      else if(path.includes("/")){

      }
    };
  
  useEffect(()=>{
    setHeaderTitle(getTitle());
    api.get("/user/userprofile"
    //   ,{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  ).then(res => {
      //alert(JSON.stringify(res.data));
      setUser(res.data.FullName);
      setRole(res.data.Role);
    })
      .catch(() => handleLogout());  
  },[]);

  const handleLogout = () => {
    // Clear auth token, redirect, etc.
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <>    
    <div className="navbar bg-info-content justify-between px-4">      
      <div className="text-white text-xl font-bold">Assessment Portal</div>
      {/* <div className="text-primary-content text-xl font-bold">{headerTitle}</div> */}
      <UserAvatarDropdown fullName={user} role={role} onLogout={handleLogout} />
    </div>
    {/* Breadcrumbs */}
      {/* <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          {pathSegments.map((segment, index) => {
            const fullPath = '/' + pathSegments.slice(0, index + 1).join('/');
            const isLast = index === pathSegments.length - 1;

            return (
              <li key={index}>
                {isLast ? (
                  <span className="capitalize text-gray-500">{decodeURIComponent(segment)}</span>
                ) : (
                  <Link to={fullPath} className="capitalize">{decodeURIComponent(segment)}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div> */}
    </>
  );
};
export default Header;
