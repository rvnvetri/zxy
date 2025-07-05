import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axiosInstance'
import { CCol, CFormInput, CRow } from '@coreui/react'

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/auth/login', { username, password })

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("username", res.data.username)
    localStorage.setItem("roles", JSON.stringify(res.data.roles))

    navigate("/dashboard")
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit} className='g-1'>
        <input className="form-control my-2 col-md-3" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input className="form-control my-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
