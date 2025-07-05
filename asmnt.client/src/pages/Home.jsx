import {React } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Home = () => {
    return (
        <>
        
        
        <div className="hero bg-base-200 min-h-screen">
            
        <div className="hero-content text-center">

            
            <div className="hero flex w-full flex-col lg:flex-row">
                <div className="card bg-info-content text-white  w-70 bg-base-100 card-sm shadow-sm mb-2 mr-2">
                    <div className="card-body">
                        <h2 className="card-title">STUDENT</h2>
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
                        <h2 className="card-title">STAFF</h2>
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
                        <h2 className="card-title">ADMIN</h2>
                        <p>Login to your account with your credentials</p>
                        <div className="justify-end card-actions">                            
                            <Link to="/Login/2">
                                <button className="btn text-lg">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </div>
        
        </>
    )
}

export default Home
