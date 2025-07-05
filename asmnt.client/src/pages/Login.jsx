import { useState } from "react";
import api from "../axiosService";
import { useNavigate,Link,useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"
import { useToast } from "../context/ToastContext";


export default function Login() {
  const {id}=useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");

  let role="";
  
  const navigate = useNavigate();
   const [error, setError] = useState("");

   const toast = useToast();

  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  

  const handleLogin = async () => {
    
    setError("");

    if (!username || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(username)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    if(id == "0"){
      role="Student";
    }
    else if(id == "1"){      
      role="Staff";
    }
    else if(id == "2"){
      role ="Admin";
    }
    
    try {
      //var gh = axios.get("https://localhost:7279/cors-test").then(console.log);
      //alert(gh);
      //alert(username);
      //alert("fgh");
      // const res = await axios.post("https://localhost:7279/login", {
      //   username,
      //   password,
      // });
      const res = await api.post("/Auth/login",{username,password,role});      
      sessionStorage.setItem("token", res.data.token);
      toast.success("User Logged in successfully!");
    if(id == "0"){
      navigate("/stdashboard");
    }
    else if(id == "1"){      
      navigate("/sfdashboard");
    }
    else if(id == "2"){
        navigate("/adashboard");
    }
      
    
    } catch (err) {      
      //alert(JSON.stringify(err.response.data))  ;
      setError(err.response.data);
      toast.error(err.response.data);
    }
  };

  return (    
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {id == 0 &&
          <h2 className="card-title">Student Login</h2>
          }
          {id == 1 &&
          <h2 className="card-title">Staff Login</h2>
          }
          {id == 2 &&
          <h2 className="card-title">Admin Login</h2>
          }

          <input
            className="input input-bordered"
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="input input-bordered mt-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />          

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}          
          <button className="btn btn-primary mt-4" onClick={handleLogin}>
            Login
          </button>
          
          <Link
              to="/forgot-password"
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 text-right"
            >
              Forgot password?
            </Link>
        </div>
        {id != 2 &&
        <div className="mt-2 mb-5 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          {id==0 &&
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
          }
          {id==1 &&
          <Link to="/StaffRegister" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
          }
        </p>
      </div>
      }
      </div>
    </div>
  );
}
