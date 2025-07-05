import { useEffect, useState } from "react";
//import axios from "axios";
import api from "../axiosService";
import { useNavigate, Link, useParams, Links } from "react-router-dom";
import NProgress from "nprogress";

export default function StudentDashboard() {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/user/studentdashoard"
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
  
  return (
    <>
      {dashboardInfo &&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <div className="card bg-primary-content text-black shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Requested Assessment</h2>
              <div className="text-lg font-semibold flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
                  {dashboardInfo.RequestedAssementCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-primary-content  text-black shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Feedback Received</h2>
              <div className="text-lg font-semibold flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
                  {dashboardInfo.FeedbackCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Link to="/requesthome">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 p-4">        
          <button className="btn bg-info-content lg:btn-lg xl:btn-xl text-white">New Request</button>                 
       </div>
      </Link>
    </>
  );
}
