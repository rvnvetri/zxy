import { useEffect, useState } from "react";
import api from "../axiosService";
import { useNavigate, Link, useParams, Links } from "react-router-dom";
import NProgress from "nprogress";

const requesthome = () => {
  const [specialities, setSpecialities] = useState([]);
  const [specialitiesQues, setSpecialitiesQues] = useState([]);
  const [showSpecialities, setShowSpecialities] = useState(true);
  const [selectedspcdid, setSelectedspcdid] = useState(null);
  const [selectedspcdname, setSelectedspcdname] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {    
    api.get("/Student/getspecialities"      
    ).then(res => {
      setSpecialities(res.data);
    })
      .catch((err) => {
        setSpecialities([]);
        if (err.response?.status === 403) {
          navigate("/unauthorized");
        } else {
          console.error("API error:", err);
        }
      });
  }, []);

  useEffect(() => {    
    api.get("/Student/getspecialitiesq"      
    ).then(res => {
      setSpecialitiesQues(res.data);
    })
      .catch((err) => {
        setSpecialitiesQues([]);
        if (err.response?.status === 403) {
          navigate("/unauthorized");
        } else {
          console.error("API error:", err);
        }
      });
  }, []);

  const onclickspecialities=(id,name)=>{
    //alert(id);
    //alert(name);
    setShowSpecialities(false);
    setSelectedspcdid(id);
    
    setSelectedspcdname(name);
  }
  const onclickspecialitiesques=(qid)=>{    
    navigate("/QRGen");
  };
  const handleBack=()=>{
    setShowSpecialities(true);
    setSelectedspcdid(0);
    setSelectedspcdname("");
  }
  return (
    <>
    
    {specialities && showSpecialities == true &&
    <>
      <h1 className="text-2xl font-bold text-education-700 mb-5 cfontcolor">Specialities</h1>
     <div className="grid grid-cols-3 md:grid-cols-3 gap-3">      
        {specialities.map((item) => (
          <button className="cbgcolor btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl py-10 justify-start rounded-box" onClick={() => onclickspecialities(item.SpecialitiesId,item.SpecialitiesName)}>{item.SpecialitiesName}</button>
        ))}
        </div>        
        <Link to="/stdashboard">
         <div className="mt-4">            
              <button className="btn btn-neutral text-xl">Back</button>            
          </div>     
          </Link>
        </>
        }
      {selectedspcdid && showSpecialities == false &&
      <>
      <h1 className="text-2xl font-bold text-education-700 mb-5 cfontcolor">EPA for {selectedspcdname}</h1>
     <div className="grid grid-cols-1 md:grid-cols-1 gap-3">      
        {specialitiesQues.map((item,index) => (
          <button className=" btn bg-info-content btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl py-6 justify-start rounded-box text-white text-m font-thin" onClick={() => onclickspecialitiesques(item.SpecialitiesQuesId)}>EPA{index+1} : {item.SpecialitiesQname}</button>
        ))}
        </div>   
        <div className="mt-4">            
              <button className="btn btn-neutral text-xl" onClick={()=>handleBack()}>Back</button>            
          </div>     
        </>
        }
   
        
      </>
  )
}

export default requesthome
