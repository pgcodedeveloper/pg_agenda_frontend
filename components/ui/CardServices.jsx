"use client"
import React from 'react'
import { Icons } from '@/helpers';
import Link from 'next/link';

const CardServices = () => {
    const services = [
        {
            id: 1,
            icon: Icons.settings,
            title: 'Añade eventos a tu agenda',
            visible: true,
        },
        {
            id: 2,
            icon: Icons.settings,
            title: 'Añade tareas a tu agenda',
            visible: true,
        },
        {
            id: 3,
            icon: Icons.settings,
            title: 'Conectado con Google Calendar',
            visible: true,
        },
        {
            id: 4,
            icon: Icons.settings,
            title: 'Conectado con Google Tasks',
            visible: true,
        },
        {
            id: 5,
            icon: Icons.settings,
            title: 'Creear eventos meet al Google Calendar (Próximamente)',
            visible: false,
        }
    
    ]
    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Plan único</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-5xl font-extrabold tracking-tight">Free</span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
                {services.map(service => (
                    <li key={service?.id} className="flex items-center">
                        <div className={`${!service.visible ? 'text-gray-400' : 'text-blue-700'}`}>{Icons.check}</div>
                        <div className="ml-2">
                            <p className={`text-sm font-medium flex items-center gap-x-2 ${!service?.visible ? 'text-gray-400' : ''}`}>
                                {service?.title}
                            </p>
                        </div>
                    </li>
                ))}
                
            </ul>
            <Link legacyBehavior href={"#terminos"}>
                <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Ver Términos y Condiciones</a>
            </Link>
        </div>
    )
}

export default CardServices
