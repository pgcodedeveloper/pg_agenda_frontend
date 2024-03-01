"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import InputForm from './InputForm';
import Alert from './Alert';
import Context from '@/context/AppContext';
import ContextAuth from '@/context/AuthContext';
import SelectForm from './SelectForm';
import { Icons } from '@/helpers';


const ModalForm = ({open, handleClose,editar,setEditar,tareaEdit}) => {
    const { 
        handleAlertas,
        alertas,
        showAlert,
        isEmptyTask,
        createTask,
        updateTask,
        cargando, 
    } = useContext(Context);
    const { usuario } = useContext(ContextAuth);
    
    const [tarea,setTarea] = useState({
        titulo: "",
        descripcion: "",
        fecha_entrega: "",
        fecha_fin: "",
        prioridad: "",
        estado: false,
        _id: "",
        color: "",
    });

    useEffect(() => {
        if (open) {
            document.getElementById('modal').showModal();
        }
        else {
            document.getElementById('modal').close();
            clearFields();
        }
    }, [open]);

    useEffect(() =>{
        if(editar){
            //Convert the estado field from boolean to string format
            if(tareaEdit.estado){
                tareaEdit.estado = "true";
            }
            else{
                tareaEdit.estado = "false";
            }
            setTarea(tareaEdit);
        }
    },[editar]);

    //Clean the fields and set the value " "
    const clearFields = () =>{
        setTarea({
            titulo: "",
            descripcion: "",
            fecha_entrega: "",
            fecha_fin: "",
            prioridad: "",
            estado: false,
            _id: "",
            color: "",
        });
        handleAlertas({
            mensaje: "",
            tipo: ""
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmptyTask(tarea)){
            showAlert({
                mensaje: "Debe llenar todos los campos",
                tipo: "error"
            });
            return;
        }
        
        if(tarea._id !== ""){
            //Update the task
            if(tarea.estado === "true"){
                tarea.estado = true;
            }
            else{
                tarea.estado = false;
            }
            try {
                await updateTask(tarea,usuario);
                clearFields();
                showAlert({
                    mensaje: "Tarea actualizada correctamente",
                    tipo: "success"
                });
                setEditar(false);
                setTimeout(() =>{
                    handleClose();
                },1500);
                
            } catch (error) {
                console.error(error);
            }
        }
        else{
            //Create the task
            //Convert the estado from string to boolean
            if(tarea.estado === "true"){
                tarea.estado = true;
            }
            else{
                tarea.estado = false;
            }
            try {
                await createTask(tarea,usuario);
                clearFields();
                handleClose();
                
            } catch (error) {
                console.error(error);
            }
            
        }

    }

    const handleChange = (e) => {
        setTarea({
         ...tarea,
            [e.target.name]: e.target.value
        })
    }

    return (
        <dialog id="modal" className="modal backdrop-blur-sm modal-scroll-color">
            <div className="modal-box rounded-md max-w-none sm:w-[65%] sm:max-h-[100%]">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                        onClick={() => handleClose()}
                    >✕</button>
                </form>
                <div className='container'>
                    <h3 className="font-black text-xl text-primary/75 text-center uppercase">{editar ? "Editar Tarea" : "Agregar Tarea"}</h3>
                    <p className="text-gray-700/80 dark:text-gray-400 text-center">{editar ? "Edite la tarea de tu agenda" : "Agregue una nueva tarea a tu agenda."}</p>
                    
                    {alertas.mensaje && (
                        <Alert alertas={alertas}/>
                    )}
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <div className="mb-4">
                            <InputForm 
                                label={"Nombre de la Tarea"} 
                                placeholder={"Ingrese un nombre para la tarea"} 
                                name={"titulo"} 
                                id={"titulo"} 
                                icon={Icons.name} 
                                type={"text"} 
                                onChange={handleChange}
                                value={tarea.titulo}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Descripción breve de la tarea"} 
                                placeholder={"Ingrese una descripción a la tarea"} 
                                name={"descripcion"} 
                                id={"descripcion"} 
                                icon={Icons.richtext} 
                                type={"text"} 
                                onChange={handleChange}
                                value={tarea.descripcion}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Fecha de entrega"} 
                                placeholder={""} 
                                name={"fecha_entrega"} 
                                id={"fecha_entrega"} 
                                icon={Icons.date} 
                                type={"datetime-local"} 
                                onChange={handleChange}
                                value={tarea.fecha_entrega}
                            />
                        </div>
                        <div className="mb-4">
                            <SelectForm 
                                label={"Prioridad de la Tarea"}
                                name={"prioridad"}
                                id={"prioridad"}
                                onChange={handleChange}
                                value={tarea.prioridad}
                                options={[{
                                    label: "Alta",
                                    value: "alta"
                                },{
                                    label: "Media",
                                    value: "media"
                                },{
                                    label: "Baja",
                                    value: "baja"
                                }]}
                            />
                        </div>
                        <div className="mb-4">
                            <SelectForm 
                                label={"Estado de la Tarea"}
                                name={"estado"}
                                id={"estado"}
                                onChange={handleChange}
                                value={tarea.estado}
                                options={[{
                                    label: "Completa",
                                    value: "true"
                                },{
                                    label: "Incompleta",
                                    value: "false"
                                }]}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Color de la tarea"} 
                                placeholder={""} 
                                name={"color"} 
                                id={"color"}  
                                icon={Icons.color}
                                type={"color"} 
                                onChange={handleChange}
                                value={tarea.color}
                                classes={"h-[50px]"}
                            />
                        </div>

                        <button
                            className='btn btn-primary px-5 py-2'
                            type='submit'
                            disabled={cargando}
                        >
                            {editar ? "Guardar Cambios" : "Agregar"}
                            {cargando && <span className="ml-2"><Spinner/></span>}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ModalForm
