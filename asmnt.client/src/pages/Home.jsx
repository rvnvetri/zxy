import {React } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import api from '../axiosService'

const Home = () => {

    const OnPostButtonClick= async ()=>
    {
        try{
     alert("Init") ;
     const res = await api.post("/Vali/cors-test",{name: 'Vetri'});      
     alert(JSON.stringify(res.data));
     }
        catch(execption){
            alert(JSON.stringify(execption));
        }
           //sessionStorage.setItem("token", res.data.token);
           //toast.success("User Logged in successfully!");
    }

    const OnGetButtonClick= async ()=>
    {
        try{
     alert("Init Get") ;
     const res = await api.get("/Vali/cors-test-get");      
     alert(JSON.stringify(res.data));
     }
        catch(execption){
            alert(JSON.stringify(execption));
        }
           //sessionStorage.setItem("token", res.data.token);
           //toast.success("User Logged in successfully!");
    }

    return (
        <>
        
        
        <div className="hero bg-base-200 min-h-screen">
            
        <div className="hero-content text-center">

            
            <div className="hero flex w-full flex-col lg:flex-row">
                <div className="card bg-info-content text-white  w-70 bg-base-100 card-sm shadow-sm mb-2 mr-2">
                    <div className="card-body">
                        <h2 className="card-title">STUDENT 1</h2>
                        <p>Login to your account with your credentials</p>
                        <div className="justify-end card-actions">
                            <Link to="/Login/0">
                                <button className="btn text-lg">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card bg-info-content text-white w-70 bg-base-50 card-sm shadow-sm mb-2 mr-2">
                    <div className="card-body">
                        <h2 className="card-title">STAFF 2</h2>
                        <p>Login to your account with your credentials</p>
                        <div className="justify-end card-actions">
                            <Link to="/Login/1">
                                <button className="btn text-lg">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card bg-info-content text-white w-70 bg-base-100 card-sm shadow-sm mb-2">
                    <div className="card-body">
                        <h2 className="card-title">ADMIN 3</h2>
                        <p>Login to your account with your credentials</p>
                        <div className="justify-end card-actions">                            
                            <Link to="/Login/2">
                                <button className="btn text-lg">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn text-lg btn-primary" onClick={OnGetButtonClick}>Test Get</button>
                </div>
                <div>
                    <button className="btn text-lg btn-primary" onClick={OnPostButtonClick}>Test Post</button>
                </div>
            </div>
            </div>
        </div>
        
        </>
    )
}

export default Home
