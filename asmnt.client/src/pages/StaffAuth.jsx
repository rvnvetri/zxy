import { useState } from "react";

const StaffAuth = () => {

  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">          
          <h1 className="card-title">OTP</h1>
          <div className="form-control w-full max-w-md">
  <label className="label">
    <span className="label-text text-md font-bold">Phone Number 1</span>
  </label>
  <input
    type="text"
    placeholder="Enter your Phone Number"
    className="input input-bordered w-full"
  />
</div>
                  
          <button className="btn btn-primary mt-4" onClick="">
            SEND
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaffAuth
