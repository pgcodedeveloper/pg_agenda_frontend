"use client"
import Collapse from "@/components/ui/Collapse";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Spinner } from 'flowbite-react'
import MainContent from "@/components/layouts/MainContent";
export default function Home() {
    const { cargando } = useAuth();
    
    const linksEvent = [
        {
            title: "Ir a los Eventos",
            url: "/eventos"
        },
    ]

    const linksRec = [
        {
            title: "Ir a las Tareas",
            url: "/tareas"
        },
    ]
    return (
        <MainContent props={"py-16 px-8 lg:py-24 lg:px-14"}>
            {cargando ? <Spinner /> : (
                <section className="w-full sm:w-[85%]">
                    <h2 className="text-3xl font-medium [&>span]:text-[#0284C7] [&>span]:font-black text-center">Bienvenido a tu <span>Agenda</span> personal</h2>
                    <p className="text-gray-700 text-center mt-2">Aquí podrás administrar tus eventos y recordatorios.</p>
                    
                    <div className="flex justify-center mt-12 flex-col gap-y-5">
                        <Collapse title={"Administra tus eventos"} description={"Puedes agregar y eliminar eventos"} links={linksEvent} props={"collapse-open rounded-md"}/>
                        <Collapse title={"Administra tus recordatorios"} description={"Puedes agregar y eliminar recordatorios"} links={linksRec} props={"collapse-open rounded-md"}/>
                    </div>
                </section>
            )}
        </MainContent>
    );
}
