"use client"
import Context from "@/context/AuthContext";
import { useContext, useState } from "react";

const useAuth = () => {
    const { usuario,cargando,logoutUser } = useContext(Context);
    
    return {
        usuario,
        cargando,
        logoutUser
    }
}

export default useAuth
