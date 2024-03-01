"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import InputForm from './InputForm';
import Alert from './Alert';
import Context from '@/context/AppContext';
import ContextAuth from '@/context/AuthContext';
import SelectForm from './SelectForm';
import { Icons } from '@/helpers';

const ModalForm = ({open, handleClose,editar,setEditar,eventoEdit}) => {
    const { 
        handleAlertas,
        alertas,
        showAlert,
        isEmptyEvent,
        createEvent,
        updateEvent,
        cargando, 
    } = useContext(Context);
    const {
        usuario
    } = useContext(ContextAuth);
    
    const [evento,setEvento] = useState({
        evento: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        _id: "",
        color: "",
        recordatorio:{
            type: "",
            minutes: "",
        }
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
            //Convert the recordatorio.minutes field to string format
            eventoEdit.recordatorio.minutes = eventoEdit.recordatorio.minutes.toString();
            setEvento(eventoEdit);
        }
    },[editar]);

    //Clean the fields and set the value " "
    const clearFields = () =>{
        setEvento({
            evento: "",
            descripcion: "",
            fecha_inicio: "",
            fecha_fin: "",
            _id: "",
            color: "",
            recordatorio: {
                type: "",
                minutes: "",
            }
        });
        handleAlertas({
            mensaje: "",
            tipo: ""
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmptyEvent(evento)){
            showAlert({
                mensaje: "Debe llenar todos los campos",
                tipo: "error"
            });
            return;
        }
        
        if(evento._id !== ""){
            //Update the event
            try {
                await updateEvent(evento,usuario);
                clearFields();
                showAlert({
                    mensaje: "Evento actualizado correctamente",
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
            //Create the event
            //Convert the recordatorio.minutes to number
            evento.recordatorio.minutes = Number(evento.recordatorio.minutes);
            try {
                await createEvent(evento,usuario);
                clearFields();
                handleClose();
            } catch (error) {
                console.error(error);
            }
            
        }

    }

    const handleChange = (e) => {
        setEvento({
         ...evento,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeSelect = (e) => {
        setEvento({
         ...evento,
            recordatorio: {
                ...evento.recordatorio,
                [e.target.name]: e.target.value
            }
        });
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
                    <h3 className="font-black text-xl text-primary/75 text-center uppercase">{editar ? "Editar Evento" : "Agregar Evento"}</h3>
                    <p className="text-gray-700/80 dark:text-gray-400 text-center">{editar ? "Edite el evento de tu agenda" : "Agregue un nuevo evento a tu agenda."}</p>
                    
                    {alertas.mensaje && (
                        <Alert alertas={alertas}/>
                    )}
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <div className="mb-4">
                            <InputForm 
                                label={"Nombre del Evento"} 
                                placeholder={"Ingrese un nombre para el evento"} 
                                name={"evento"} 
                                id={"evento"} 
                                icon={Icons.name} 
                                type={"text"} 
                                onChange={handleChange}
                                value={evento.evento}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Descripción breve del Evento"} 
                                placeholder={"Ingrese una descripción al evento"} 
                                name={"descripcion"} 
                                id={"descripcion"} 
                                icon={Icons.richtext} 
                                type={"text"} 
                                onChange={handleChange}
                                value={evento.descripcion}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Fecha de Inicio del Evento"} 
                                placeholder={""} 
                                name={"fecha_inicio"} 
                                id={"fecha_inicio"} 
                                icon={Icons.date} 
                                type={"datetime-local"} 
                                onChange={handleChange}
                                value={evento.fecha_inicio}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Fecha de Fin del Evento"} 
                                placeholder={""} 
                                name={"fecha_fin"} 
                                id={"fecha_fin"}   
                                icon={Icons.date} 
                                type={"datetime-local"} 
                                onChange={handleChange}
                                value={evento.fecha_fin}
                            />
                        </div>
                        <div className="mb-4">
                            <SelectForm 
                                label={"Tipo de Recordatorio"}
                                name={"type"}
                                id={"type"}
                                onChange={handleChangeSelect}
                                value={evento.recordatorio.type}
                                options={[{
                                    label: "Notificación",
                                    value: "popup"
                                },{
                                    label: "Vía Email",
                                    value: "email"
                                }]}
                            />
                        </div>
                        <div className="mb-4">
                            <SelectForm 
                                label={"Minutos antes que se envia el recordatorio"}
                                name={"minutes"}
                                id={"minutes"}
                                onChange={handleChangeSelect}
                                value={evento.recordatorio.minutes}
                                options={[{
                                    label: "5 minutos",
                                    value: 5
                                },{
                                    
                                    label: "10 minutos",
                                    value: 10
                                },{
                                    
                                    label: "20 minutos",
                                    value: 20
                                },{
                                    
                                    label: "30 minutos",
                                    value: 30
                                },{
                                    
                                    label: "40 minutos",
                                    value: 40
                                }]}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm 
                                label={"Color del evento"} 
                                placeholder={""} 
                                name={"color"} 
                                id={"color"}  
                                icon={Icons.color}
                                type={"color"} 
                                onChange={handleChange}
                                value={evento.color}
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
