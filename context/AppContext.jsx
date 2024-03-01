"use client"
import React, { createContext, useState } from 'react'
import axios from 'axios'

//Create the AppProvider for the applicationç
const Context = createContext();
const AppContext = ({children}) => {
    const [eventos,setEventos] = useState([]);
    const [tareas,setTareas] = useState([]);
    const [tareasPend,setTareasPend] = useState([]);
    const [tareasDone,setTareasDone] = useState([]);
    const [cargando,setCargando] = useState(true);
    const [cargandoElim,setCargandoElim] = useState(false);
    const [alertas,setAlertas] = useState({
        mensaje:"",
        tipo: ""
    });

    //Get the event and then set the local state
    const getEvents = async (user) =>{
        setCargando(true);
        try {
            const userRef = JSON.parse(user);
            //TODO: Create a environment variable for the API events
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-events?user=${userRef.email}`
            const { data } = await axios.get(url);
            setEventos(data);
        } catch (error) {
            console.error(error);
        }
        finally{
            setCargando(false);
        }
    }
    //Get the task and then set the local state
    const getTasks = async (user) =>{
        setCargando(true);
        try {
            const userRef = JSON.parse(user);
            //TODO: Create a environment variable for the API tasks
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-tasks?user=${userRef.email}`
            const { data } = await axios.get(url);
            setTareas(data);

            //Get tasks from the estado is false and true then save it into local state
            setTareasPend(data.filter(task => {
                if(!task.estado){
                    return task;
                }
            }));
            setTareasDone(data.filter(task => {
                if(task.estado){
                    return task;
                }
            }));

        } catch (error) {
            console.error(error);
        }
        finally{
            setCargando(false);
        }
    }

    //Set in the state alertas the alert passed from the parameters
    const handleAlertas = (alert) =>{
        setAlertas(alert);
    }

    //Show the alert and after the 2000ms clear the alert
    const showAlert = (alert) => {
        handleAlertas(alert);
        setTimeout(() => {
            handleAlertas({
                mensaje: "",
                tipo: ""
            });
        },2000)
    }

    //Return true if the event parameter have empty keys
    const isEmptyEvent = (evento) =>{
        return evento.evento === "" && evento.descripcion === "" && evento.fecha_inicio === "" && evento.fecha_fin === "";
    }

    //Return true if the task parameter have empty keys
    const isEmptyTask = (task) =>{
        return task.titulo === "" && task.descripcion === "" && task.fecha_entrega === "" && task.prioridad === "";
    }

    //Create a new event and add it to database and after add it to local state
    const createEvent = async (evento,user) => {
        setCargando(true);
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-event`,{event: evento, user: JSON.parse(user)});
            console.log(data);
            //Get the payload data from the data response
            const { payload } = data;
            //Asign the event_id and id to evento
            evento._id = payload._id;
            evento.event_id = payload.event_id;

            setEventos([...eventos,evento]);
        } catch (error) {
            console.error(error);
            showAlert({
                mensaje: "No se pudo crear el evento por: " + error.response.data.msg,
                tipo: "error"
            });
        }
        finally{
            setCargando(false);
        }
    }

    //Update an event and after update it to local state
    const updateEvent = async (evento,user) => {
        setCargando(true);
        try {
            const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-event`,{event: evento, user: JSON.parse(user)});
            //const data = await response.json();
            setEventos(eventos.map(e => e._id === evento._id? evento : e));
        } catch (error) {
            console.error(error);
            showAlert({
                mensaje: "No se pudo actualizar el evento por: " + error.response.data.msg,
                tipo: "error"
            });
        }
        finally{
            setCargando(false);
        }
    }

    //Delete an event and after delete it to local state
    const deleteEvent = async (evento,user) => {
        setCargandoElim(true);
        try {
            //console.log(user);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-event`,{event: evento, user: JSON.parse(user)});
            //const data = await response.json();
            setEventos(eventos.filter(e => e._id!== evento._id));
        } catch (error) {
            console.error(error);
            showAlert({
                mensaje: "No se pudo eliminar el evento por: " + error.response.data.msg,
                tipo: "error"
            });
        }
        finally{
            setCargandoElim(false);
        }
    }

    //Create a new task and add it to database and after add it to local state
    const createTask = async (task,user) => {
        setCargando(true);
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-task`,{task: task, user: JSON.parse(user)});
            //Get the payload data from the data response
            const { payload } = data;
            //Asign the task_id and id to task
            task._id = payload._id;
            task.task_id = payload.task_id;
            task.task_list_id = payload.task_list_id;

            setTareas([...tareas,task]);
            setTareasPend([...tareasPend,task]);
        } catch (error) {
            console.error(error);
            showAlert({
                mensaje: "No se pudo agregar la tarea por: " + error.response.data.msg,
                tipo: "error"
            });
        }
        finally{
            setCargando(false);
        }
    }

    //Update a task and after update it to local state
    const updateTask = async(task,user) => {
        setCargando(true);
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-task`,{task: task, user: JSON.parse(user)});
            //const data = await response.json();
            setTareas(tareas.map(e => e._id === task._id? task : e));
            if(task.estado){
                //Delete the tasks updated from tareasPend and then add it to tareasDone
                setTareasPend(tareasPend.filter(e => e._id!== task._id));
                setTareasDone([...tareasDone,task]);
            }
            else{
                //Delete the tasks updated from tareasDone and then add it to tareasPend
                setTareasDone(tareasDone.filter(e => e._id!== task._id));
                setTareasPend([...tareasPend,task]);
            }
        } catch (error) {
            console.error(error);
            showAlert({
                mensaje: "No se pudo actualizar la tarea por: " + error.response.data.msg,
                tipo: "error"
            });
        }
        finally{
            setCargando(false);
        }
    }
    
    //Delete a task and after delete it to local state
    const deleteTask = async(task,user) => {
        setCargandoElim(true);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-task`,{task: task, user: JSON.parse(user)});
            //const data = await response.json();
            setTareas(tareas.filter(e => e._id!== task._id));
            if(task.estado){
                setTareasDone(tareasDone.filter(e => e._id!== task._id));
            }
            else{
                setTareasPend(tareasPend.filter(e => e._id!== task._id));
            }
        } catch (error) {
            console.error(error);
            showAlert({
                mensaje: "No se pudo eliminar la tarea por: " + error.response.data.msg,
                tipo: "error"
            });
        }
        finally{
            setCargandoElim(false);
        }
    }

    return (
        <Context.Provider value={{ 
            eventos,
            tareas,
            tareasPend,
            tareasDone,
            cargando,
            cargandoElim,
            alertas,
            getEvents,
            getTasks,
            handleAlertas,
            showAlert,
            isEmptyEvent,
            isEmptyTask,
            createEvent,
            updateEvent,
            deleteEvent,
            createTask,
            updateTask,
            deleteTask,
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context
export { AppContext }
