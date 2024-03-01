"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import HeaderDashboard from './HeaderDashboard';
import HeaderLogin from './HeaderLogin';
const Header = () => {
    const pathname = usePathname();
    return (
        <>
            {pathname !== "/login" && pathname !== "/registro" ? (
                <HeaderDashboard />
            ): (
                <HeaderLogin />
            )}
        </>
    )
}

export default Header
