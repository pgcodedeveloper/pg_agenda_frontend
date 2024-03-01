"use client"
import React from 'react';
import Link from 'next/link';

const HeaderLogin = () => {
    return (
        <header className="fixed top-0 left-0 right-0 w-full flex items-center justify-center text-[#23272E] pt-2 z-10">
            <div className="w-[95%] sm:w-[60%] bg-[#0285c78f] py-2 px-5 flex items-center justify-between rounded-full backdrop-blur-sm">
                <div className='flex items-center gap-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                        <path d="M13 8l2 0" /><path d="M13 12l2 0" />
                    </svg>
                    <h1 className="text-xl sm:text-2xl font-black">Agenda</h1>
                </div>

                <nav className='flex items-center gap-x-2'>
                    <Link legacyBehavior href={"#inicio"}>
                        <a className='text-sm font-bold'>Acceder</a>
                    </Link>
                    <Link legacyBehavior href={"#servicios"}>
                        <a className='text-sm font-bold'>Servicios</a>
                    </Link>
                    <Link legacyBehavior href={"#terminos"}>
                        <a className='text-sm font-bold'>Términos</a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default HeaderLogin
