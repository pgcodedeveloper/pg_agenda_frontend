"use client"
import ModalForm from '@/components/ui/ModalTask';
import Context from '@/context/AppContext';
import { Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import MenuOptions from '@/components/ui/MenuOptions';
import TasksCont from '@/components/ui/TasksCont';
import MainContent from '@/components/layouts/MainContent';

const Tareas = () => {
    const { getTasks,tareas,tareasPend,tareasDone,cargando } = useContext(Context);
    const { cargando: cargandoAuth, usuario } = useAuth();
    const [ open,setOpen ] = useState(false);
    const [ tarea,setTarea ] = useState({});
    const [ editar,setEditar ] = useState(false);
    const [ opcionTareas, setOpcionTareas ] = useState("todas");

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        if(editar){
            setEditar(false);
        }
        setTarea({});
    }

    //Set true in "open"
    const editarTarea = (task) =>{
        setTarea(task);
        setEditar(true);
        setOpen(true);
    }

    useEffect(() =>{
        if(usuario){
            getTasks(usuario);
        }
    },[usuario]);

    const handleOptions = (option) =>{
        if(option !== opcionTareas){
            setOpcionTareas(option);
        }
    } 
    return (
        <MainContent props={"py-16 px-8 lg:py-24 lg:px-14"}>
            {cargandoAuth ? <Spinner /> : (
                <>
                    <section className="w-full sm:w-[85%]">
                        <h2 className="text-3xl font-black text-center uppercase">Tareas</h2>
                        <p className="text-gray-700 dark:text-gray-400 text-center mt-2">Aquí podrás crear y administrar tus tareas.</p>

                        <button className="btn btn-sm btn-primary mt-5" type="button"
                            onClick={() => handleOpen()}
                        >
                            Nuevo Tarea
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
                                <div className='flex items-center justify-center'>
                                    <MenuOptions activa={opcionTareas} handleOption={handleOptions}/>
                                </div>
                                
                                {opcionTareas === "todas" ? (
                                    <TasksCont tareas={tareas} editarTarea={editarTarea} isNoTasks={"No se han encontrado tareas aún. Comience creando una"}/>
                                ) : opcionTareas === "pendientes" ? (
                                    <TasksCont tareas={tareasPend} editarTarea={editarTarea} isNoTasks={"¡Hurra no se han encontrado tareas pendientes!"}/>
                                ) : (
                                    <TasksCont tareas={tareasDone} editarTarea={editarTarea} isNoTasks={"No se han encontrado tareas completas."}/>
                                )}
                                
                            </>
                        )}
                    </section>
                    <ModalForm open={open} handleClose={handleClose} editar={editar} setEditar={setEditar} tareaEdit={tarea}/>
                </>
            )}
        </MainContent>
    )
}

export default Tareas
