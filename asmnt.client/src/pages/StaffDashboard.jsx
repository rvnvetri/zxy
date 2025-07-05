import { useEffect, useState } from "react";
//import axios from "axios";
import api from "../axiosService";
import { useNavigate, Link, useParams } from "react-router-dom";
import NProgress from "nprogress";

export default function StaffDashboard() {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/user/staffdashoard"
      //   ,{
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    ).then(res => {      
      setDashboardInfo(res.data);
    })
      .catch((err) => {
        setDashboardInfo([]);
        if (err.response?.status === 403) {
          navigate("/unauthorized");
        } else {
          console.error("API error:", err);
        }
      });
  }, []);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");    
  //   axios.get("https://localhost:7279/api/user/userprofile", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then(res => {
  //     alert(JSON.stringify(res.data));
  //     setUser(res.data.FirstName);
  //   })
  //     .catch(() => setUser("Unknown"));
  // }, []);

  return (
    <>
      {dashboardInfo &&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Assessment Submitted:</h2>
              <div className="text-lg font-semibold flex items-center gap-2">
                
                <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-full text-sm font-bold">
                  {dashboardInfo.SubmittedAssementCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Assessment In Queue:</h2>
              <div className="text-lg font-semibold flex items-center gap-2">
                
                <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-full text-sm font-bold">
                  {dashboardInfo.AssementInQueue}
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </>
  );
}
