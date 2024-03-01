"use client"
import React, { useContext, useState } from 'react'
import Badges from './Badges'
import { formatDate } from '@/helpers'
import Context from '@/context/AppContext'
import ContextAuth from '@/context/AuthContext'
import QuestionAlert from './QuestionAlert'

const TareasCard = ({tarea, editarTarea}) => {
    const {deleteTask,cargandoElim} = useContext(Context);
    const {
        usuario
    } = useContext(ContextAuth);

    const [alert,setAlert] = useState(false);
    const [tareaElim,setTareaElim] = useState({});

    //Evaluate the tarea.pripridad and return the correct color for text
    const pripridad = () =>{
        let propietes = []
        switch(tarea.prioridad){
            case "alta":
                propietes.push("bg-red-300");
                propietes.push("text-red-600");
                break;
            case "media":
                propietes.push("bg-orange-300");
                propietes.push("text-orange-600");
                break;
            case "baja":
                propietes.push("bg-green-300");
                propietes.push("text-green-600");
                break;
            default:
                propietes.push("bg-gray-300");
                propietes.push("text-gray-600");
                break;
        }
        return propietes;
    }
    //Ask the user if they want delete the task
    const wantDelete = (task) =>{
        setAlert(true);
        setTareaElim(task);
    }

    const handleDelete = async() =>{
        await deleteTask(tareaElim,usuario);
        if(!cargandoElim){
            setAlert(false);
            setTareaElim({});
        }
    }

    const handleClose = () => {
        setAlert(false);
        setTareaElim({});
    }
    return (
        <>
            <article className="mt-5 relative flex max-h-[500px] flex-col rounded-xl bg-slate-100 bg-clip-border text-gray-700 shadow-md">
                <div 
                    className="flex-1 flex relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-tr from-slate-400 to-slate-600"
                >
                    <div className='flex flex-1 items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-28 h-28" style={{ color: tarea.color}} width="128" height="128" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />
                        </svg>
                    </div>

                    {tarea.estado && (
                        <div className='absolute top-0 right-0 py-1 px-1.5'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z" fill="currentColor" strokeWidth="0" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1 p-6">
                    <div className='mt-1 flex items-center justify-between'>
                        <Badges title={tarea.prioridad} bg_color={pripridad()[0]} text_color={pripridad()[1]}/>
                        <p className='text-sm font-bold text-primary'>{formatDate(tarea.fecha_entrega)}</p>
                    </div>
                    <h5 className="mt-2 text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {tarea.titulo}
                    </h5>
                    <p className="mt-2 text-sm font-light leading-relaxed text-inherit antialiased">
                        {tarea.descripcion}
                    </p>
                </div>
                <div className="p-6 pt-0 flex items-center justify-between gap-x-3">
                    <button type="button" className="btn btn-sm btn-circle btn-ghost"
                        onClick={() => editarTarea(tarea)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                        </svg>
                    </button>
                    <button type="button" className="btn btn-sm btn-circle btn-ghost"
                        onClick={() => wantDelete({_id: tarea._id, task_id: tarea.task_id, task_list_id: tarea.task_list_id})}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
            </article>
            {alert && (
                    <QuestionAlert 
                        key={tarea._id}
                        text="¿Está seguro que desea eliminar esta tarea?"
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
        </>
    )
}

export default TareasCard
