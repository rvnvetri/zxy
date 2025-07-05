import { useEffect, useState } from "react";
//import axios from "axios";
import api from "../axiosService";
import { useNavigate,Link,useParams } from "react-router-dom";
import NProgress from "nprogress";

export default function AdminDashboard() {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    api.get("/user/admindashoard"
    //   ,{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  ).then(res => {
      setDashboardInfo(res.data);
    })
      .catch((err) =>{
        setDashboardInfo([]);
        if (err.response?.status === 403) {
          navigate("/unauthorized");
        } else {
          console.error("API error:", err);
        }
      } );  
  },[]);

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
        <div className="card bg-primary-content text-black shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Students</h2>
        <div className="text-lg font-semibold flex items-center gap-2">
  Total registered Studentsd:
  <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
    {dashboardInfo.StudentRegCount}
  </div>
</div>
          </div>
        </div>
        <div className="card bg-primary-content text-black shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Staffs</h2>
            <div className="text-lg font-semibold flex items-center gap-2">
  Total registered Staffs:
  <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
    {dashboardInfo.StaffRegCount}
  </div>
</div>
            
          </div>
        </div>


        {/* Card 4 */}
        <Link to="/UserActivate">
        <div className="card bg-primary-content text-black content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pending User Activation</h2>
                  <div className="text-lg font-semibold flex items-center gap-2">
  Total Inactive Users:
  <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
    {dashboardInfo.UserInactiveCount}
  </div>
</div>
            
          </div>
        </div>
        </Link>




        {/* Card 2 */}
        <div className="card bg-primary-content text-black shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Submitted Questions </h2>
                  <div className="text-lg font-semibold flex items-center gap-2">
  Total Submitted:
  <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
    200
  </div>
</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-primary-content text-black shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Assessment Feedback</h2>
             <div className="text-lg font-semibold flex items-center gap-2">
  Assessment Completed:
  <div className="w-8 h-8 flex items-center justify-center cbgcolor text-white rounded-full text-sm font-bold">
    300
  </div>
</div>
          </div>
        </div>
      </div>

    }
      
    </>
  );
}
