"use client"
import { formatDate } from '@/helpers'
import React, { useContext, useState } from 'react'
import QuestionAlert from './QuestionAlert';
import Context from '@/context/AppContext';
import ContextAuth from '@/context/AuthContext';
import { toast,Toaster } from 'sonner'

const EventosCards = ({eventos,editarEvento}) => {
    const {deleteEvent,cargandoElim} = useContext(Context);
    const {
        usuario,
        isAuth
    } = useContext(ContextAuth);
    const [alert,setAlert] = useState(false);
    const [eventoElim,setEventoElim] = useState({});
    const colors = eventos.map((event) => {
        return event.color
    });

    //Ask the user if they want delete the event
    const wantDelete = (event) =>{
        setAlert(true);
        setEventoElim(event);
    }

    const handleDelete = async() =>{
        //console.log(usuario);
        await deleteEvent(eventoElim,usuario);
        if(!cargandoElim){
            setAlert(false);
            setEventoElim({});
        }
    }

    const handleClose = () => {
        setAlert(false);
        setEventoElim({});
    }
    return (
        <div className="w-full mt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Eventos disponibles</h3>
            </div>
            
            <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">     
                {eventos.map((evento,index) => (          
                    <li key={evento?._id}>            
                        <div
                            className="bg-slate-100 rounded-b-lg border-t-8 px-2 pt-5 pb-2 flex flex-col justify-around shadow-md"
                            style={{ borderColor: colors[index]}}
                        >
                            <h5 className="text-lg font-bold font-sans">{evento.evento}</h5>
                            <div className="mt-1.5">
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDate(evento?.fecha_inicio)} - {formatDate(evento?.fecha_fin)}</time>
                                <p className="text-gray-400 text-sm text-wrap">
                                    {evento?.descripcion}
                                </p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 17c1.306 0 2.418 .835 2.83 2h5.17a1 1 0 0 1 0 2h-5.171a3.001 3.001 0 0 1 -5.658 0h-5.171a1 1 0 0 1 0 -2h5.17a3.001 3.001 0 0 1 2.83 -2z" strokeWidth="0" fill="currentColor" />
                                    <path d="M17 2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2.586l-1.707 1.707a1 1 0 0 1 -1.32 .083l-.094 -.083l-1.708 -1.707h-2.585a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-8a2 2 0 0 1 2 -2h10z" strokeWidth="0" fill="currentColor" />
                                </svg>
                                <div className="text-sm flex gap-2">
                                    <button className='btn btn-sm btn-ghost btn-circle'
                                        onClick={() => editarEvento(evento)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#0284C7]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                            <path d="M16 5l3 3" />
                                        </svg>
                                    </button>
                                    <button className='btn btn-sm btn-ghost btn-circle'
                                        onClick={() => wantDelete({_id: evento._id, event_id: evento.event_id})}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#BB2D3B]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>

            {alert && (
                <QuestionAlert 
                    text="¿Está seguro que desea eliminar este evento?"
                    buttons={[
                        {
                            text: "Sí, Eliminar",
                            type: "btn-primary"
                        },
                        {
                            text: "Cancelar",
                        }
                    ]}
                    operations={[handleDelete,handleClose]}
                    cargando={cargandoElim}
                />
            )}
        </div>

    )
}

export default EventosCards
