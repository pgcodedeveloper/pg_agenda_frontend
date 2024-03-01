import React from 'react'
import TareasCard from './Tareas'
import NoTasks from './NoTasks'

const TasksCont = ({tareas, isNoTasks,editarTarea}) => {
    return (
        <>
            {tareas.length > 0 ? (
                <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {tareas.map((tarea) => (
                        <TareasCard key={tarea._id} tarea={tarea} editarTarea={editarTarea}/>
                    ))}
                </section>
            ) : (
                <NoTasks text={isNoTasks}/>
            )}
        </>
    )
}

export default TasksCont

