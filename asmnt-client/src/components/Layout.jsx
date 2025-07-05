import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'
import { CContainer } from '@coreui/react'

export default function Layout() {
  return (
    <div>
      <AppHeader />
      <div className="d-flex">
        {/* <AppSidebar /> */}
        <CContainer className="mt-4">
          <Outlet />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  )
}
