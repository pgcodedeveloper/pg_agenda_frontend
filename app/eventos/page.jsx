"use client"
import MainContent from '@/components/layouts/MainContent';
import EventosCards from '@/components/ui/Eventos';
import ModalForm from '@/components/ui/Modal';
import Context from '@/context/AppContext';
import useAuth from '@/hooks/useAuth';
import { Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'

const Eventos = () => {
    const { usuario,cargando: cargandoAuth } = useAuth();
    const { getEvents,eventos,cargando } = useContext(Context);
    const [ open,setOpen ] = useState(false);
    const [ evento,setEvento ] = useState({});
    const [ editar,setEditar ] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        if(editar){
            setEditar(false);
        }
        setEvento({});
    }

    //Set true in "open"
    const editarEvento = (event) =>{
        setEvento(event);
        setEditar(true);
        setOpen(true);
    }

    useEffect(() =>{
        if(usuario){
            getEvents(usuario);
        }
    },[usuario]);

    return (
        <MainContent props={"py-16 px-8 lg:py-24 lg:px-14"}>
            {cargandoAuth ? <Spinner /> : (
                <>
                    <section className="w-full sm:w-[85%]">
                        <h2 className="text-3xl font-black text-center uppercase">Eventos</h2>
                        <p className="text-gray-700 text-center mt-2">Aquí podrás crear y administrar tus eventos.</p>

                        <button className="btn btn-sm btn-primary mt-5" type="button"
                            onClick={() => handleOpen()}
                        >
                            Nuevo Evento
                        </button>
                    </section>
                    <section className="w-full sm:w-[85%] mt-5">
                        {cargando ? (
                            <div className="flex justify-center items-center">
                                <div className="spinner-border" role="status">
                                    <Spinner />
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {eventos.length > 0 ? (
                                    <EventosCards 
                                        eventos={eventos} 
                                        editarEvento={editarEvento}
                                    />
                                ): (
                                    <p className="text-gray-700 text-center mt-2 text-sm bg-slate-300/55 py-2 w-[85%] mx-auto rounded-md">No se han encontrado eventos. Comience creando uno.</p>
                                )}
                            </>
                        )}
                    </section>
                    <ModalForm open={open} handleClose={handleClose} editar={editar} setEditar={setEditar} eventoEdit={evento}/>
                </>
            )}
        </MainContent>
    )
}

export default Eventos
