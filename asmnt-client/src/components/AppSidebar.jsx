import { CSidebar, CSidebarNav, CNavItem } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const AppSidebar =()=> {
  const navigate = useNavigate()
  return (
    <CSidebar>
      <CSidebarNav>
        <CNavItem onClick={() => navigate('/dashboard')}>Dashboard</CNavItem>
      </CSidebarNav>
    </CSidebar>
  )
}

export default AppSidebar