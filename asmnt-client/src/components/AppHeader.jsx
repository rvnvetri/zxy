import { CHeader, CHeaderBrand, CHeaderNav } from '@coreui/react'

export default function AppHeader() {
  const username = localStorage.getItem("username")
  return (
    <CHeader>
      <CHeaderBrand>My App</CHeaderBrand>
      <CHeaderNav className="ms-auto me-4">Welcome, {username}</CHeaderNav>
    </CHeader>
  )
}
