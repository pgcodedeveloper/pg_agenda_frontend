"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import AvatarProfile from '../ui/AvatarProfile'
import useAuth from '@/hooks/useAuth'
import QuestionAlert from '../ui/QuestionAlert'
const HeaderDashboard = () => {
    const { usuario,cargando,logoutUser } = useAuth();
    const [ photo, setPhoto ] = useState('');
    const [ exit, setExit] = useState(false);
    useEffect(() =>{
        if(usuario){
            setPhoto(JSON.parse(usuario).photoURL);
        }
    },[usuario]);

    const wantLogout = () =>{
        setExit(true);
    }
    const handleClose = () =>{
        setExit(false);
    }

    return (
        <header className="fixed top-0 left-0 right-0 w-full flex items-center justify-center gap-x-0.5 sm:gap-x-2 text-[#23272E] pt-2 z-10">
            {cargando ? null :(
                <>
                    <div className="w-[75%] sm:w-[80%] bg-[#0285c78f] py-2 px-5 flex items-center justify-between rounded-full backdrop-blur-xs">
                        <Link legacyBehavior href="/">
                            <a className='flex items-center gap-x-1.5 sm:gap-x-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                                    <path d="M13 8l2 0" /><path d="M13 12l2 0" />
                                </svg>
                                <h1 className="text-xl sm:text-2xl font-black">Agenda</h1>
                            </a>
                        </Link>

                        <nav className="hidden sm:flex sm:items-center gap-x-2 sm:gap-x-4">
                            <Link legacyBehavior href={"/eventos"}>
                                <a className='flex items-center gap-x-2 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                        <path d="M16 3l0 4" />
                                        <path d="M8 3l0 4" />
                                        <path d="M4 11l16 0" />
                                        <path d="M8 15h2v2h-2z" />
                                    </svg>
                                    Eventos    
                                </a>
                            </Link>
                            <Link legacyBehavior href={"/tareas"}>
                                <a className='flex items-center gap-x-2 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                                        <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                                        <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                                        <path d="M11 6l9 0" />
                                        <path d="M11 12l9 0" />
                                        <path d="M11 18l9 0" />
                                    </svg>
                                    Tareas
                                </a>
                            </Link>
                        </nav>
                        <nav className='flex items-center justify-center sm:hidden'>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link legacyBehavior href={"/eventos"}>
                                            <a className='flex items-center gap-x-2 text-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                                    <path d="M16 3l0 4" />
                                                    <path d="M8 3l0 4" />
                                                    <path d="M4 11l16 0" />
                                                    <path d="M8 15h2v2h-2z" />
                                                </svg>
                                                Eventos    
                                            </a>
                                        </Link>
                                        
                                    </li>
                                    <li>
                                        <Link legacyBehavior href={"/tareas"}>
                                            <a className='flex items-center gap-x-2 text-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                                                    <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                                                    <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                                                    <path d="M11 6l9 0" />
                                                    <path d="M11 12l9 0" />
                                                    <path d="M11 18l9 0" />
                                                </svg>
                                                Tareas
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className='bg-[#0285c78f] rounded-full backdrop-blur-sm'>
                        <AvatarProfile 
                            props={{url: photo, alt: "Imagen Perfil"}}
                            width={30}
                            height={30}
                            logout={wantLogout}
                        />
                    </div>
                </>
            )}
            {exit && (
                <QuestionAlert 
                    key={1+Math.random()}
                    text="¿Está seguro de querer cerrar sesión?"
                    buttons={[
                        {
                            text: "Sí, Cerrar",
                            type: "btn-primary"
                        },
                        {
                            text: "Cancelar",
                        }
                    ]}
                    operations={[logoutUser,handleClose]}
                />
            )}
        </header>
    )
}

export default HeaderDashboard
