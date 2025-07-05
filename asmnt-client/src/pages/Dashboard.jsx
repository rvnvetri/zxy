export default function Dashboard() {
  const username = localStorage.getItem("username")
  const roles = JSON.parse(localStorage.getItem("roles") || "[]")

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {username}</p>
      <p>Roles: {roles.join(', ')}</p>
    </div>
  )
}
