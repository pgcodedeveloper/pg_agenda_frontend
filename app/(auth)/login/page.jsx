"use client"
import Link from 'next/link'
import axios from 'axios'
import { useContext } from "react";
import { useRouter } from "next/navigation";
import CardServices from '@/components/ui/CardServices';
import { Icons } from '@/helpers';
import Collapse from '@/components/ui/Collapse';
import Image from 'next/image';
import MainContent from '@/components/layouts/MainContent';
export default function Login() {
    
    const router = useRouter();

    const loginGoogle = async() =>{
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
            router.push(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MainContent props="py-20 px-8 lg:p-28">
            <section id='inicio' className='flex flex-col sm:flex-row items-center justify-center gap-y-5 sm:gap-x-10 sm:w-[80%] sm:mx-auto'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className="text-2xl sm:text-3xl font-medium [&>span]:text-[#0284C7] [&>span]:font-black text-center text-wrap">Obtenga acceso en su <span>Agenda</span> personal</h2>
                    <p className="text-gray-700 dark:text-gray-400 text-center mt-2 text-wrap text-sm sm:text-base">Organice sus eventos y tareas de forma sencilla.</p>

                    <button type="button" className="mt-4 btn btn-outline btn-primary btn-md py-2 px-4 flex items-center"
                        onClick={() => loginGoogle()}
                    >
                        Acceder con
                        {Icons.google}
                    </button>
                </div>

                <CardServices />
            </section>

            <section id='servicios' className='mt-16 sm:w-[80%] sm:mx-auto'>
                <h2 className="text-2xl sm:text-3xl font-medium [&>span]:text-[#0284C7] [&>span]:font-black text-center text-wrap">Servicios <span>Disponibles</span> con el Plan</h2>

                <div className='mt-5 flex flex-col items-center justify-normal gap-5'>
                    <Collapse title={"Administra Eventos"} description={"Podra crear, modificar y eliminar eventos del sistema llenando un simple formulario"} links={[]}>
                        <div className='w-[85%] mx-auto flex items-center justify-center'>
                            <Image src={"/img/eventos.webp"} className='' width={627} height={439} alt='Eventos'/>
                        </div>
                    </Collapse>
                    <Collapse title={"Administra Tareas"} description={"Podra crear, modificar y eliminar tareas del sistema llenando un simple formulario"} links={[]}>
                        <div className='w-[85%] mx-auto flex items-center justify-center'>
                            <Image src={"/img/tareas.webp"} className='' width={660} height={420} alt='Eventos'/>
                        </div>
                    </Collapse>
                    <Collapse title={"Servicios Google"} description={"Podra ver sus eventos o tareas creados desde el sistema en su propio Google Calendar y acceder a las funcionalidades que ofrece: envío de recordatorios, acceso desde cualquier entorno (Web o móvil), etc."} links={[]}>

                    </Collapse>
                </div>
            </section>

            <section id='terminos' className='mt-16'>
                <h2 className="text-2xl sm:text-3xl font-medium [&>span]:text-[#0284C7] [&>span]:font-black text-center text-wrap">Requisitos y Condiciones de <span>Uso</span></h2>

                <div className='mt-5 sm:max-w-[75%] sm:mx-auto text-wrap'>
                    <p className=''>
                        Bienvenido/a a tu <span>Agenda Virtual</span>, una plataforma que te permite crear eventos y tareas y asociarlas a tu cuenta de Google Calendar y Google Tasks. 
                        Antes de utilizar nuestros servicios, te pedimos que leas detenidamente los siguientes requisitos y condiciones generales de uso. Al acceder o utilizar nuestra aplicación, aceptas seguir con estos requisitos y condiciones.
                    </p>
                    
                    <ul className='mt-4 flex flex-col gap-2'>
                        <li>
                            <h5 className='text-lg font-bold'>1. Acceso a la Aplicación</h5>
                            <p className='mt-2 text-base [&>strong]:text-[#0284C7]'>
                                Para obtener acceso y poder hacer uso de los servicios que ofrece deberá simplemente contar con una cuenta de Google y permitir al sistema acceder o utilizar su <strong>Nombre</strong>, 
                                <strong> Correo</strong> y <strong>Control sobre Google Calendar y Google Tasks</strong>.
                                Esta información se utilizará para asociar los eventos y tareas creados con los usuarios y además administrar los eventos y tareas de Google Calendar y Google Tasks.
                            </p>
                        </li>
                        <li>
                            <h5 className='text-lg font-bold'>2. Requisitos previos</h5>
                            <p className='mt-2 text-base'>
                                Además de conceder acceso a su cuenta, el usuario deberá previamente asegurarse de tener el complemento de Google Tasks activado en su Calendar y crear una nueva lista de tareas
                                si ya no tiene creada una. Esto permitirá al sistema crear las tareas en esa lista y el usuario acceder a ellas desde su Google Calendar.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </MainContent>
    );
}
