import React, { useEffect, useCallback } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import { useAppKitAccount } from '@reown/appkit/react'

const HomeLayout = () => {
  const { isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  const handleRedirect = useCallback(async () => {
    if (isConnected) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect, isConnected]);

  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default HomeLayout