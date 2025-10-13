import React, { useEffect, useCallback } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import { Outlet, useNavigate, useLocation }from 'react-router'
import MobileSidebar from '../components/dashboard/MobileSidebar'
import { useAppKitAccount } from '@reown/appkit/react'

const DashboardLayout = () => {
  const { isConnected, status } = useAppKitAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = useCallback(() => {
    if (status === 'connecting') return;

    if (!isConnected) {
      navigate("/"); 
    } else if (isConnected && !location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard"); 
    }
  }, [isConnected, location.pathname, navigate]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return (
    <div>
      <MobileSidebar />
        <div className='flex justify-between'>
          <div className='w-[20%] hidden lg:flex md:flex bg-darker overflow-y-auto max-h-[1100px]'>
        <Sidebar />
        </div>
        <div className='h-[100vh] overflow-y-scroll w-[95%] lg:w-[80%] md:w-[80%] bg-[#F3F5F7] mx-auto'>
        <Outlet />
        </div>
        </div>
    </div>
  )
}

export default DashboardLayout