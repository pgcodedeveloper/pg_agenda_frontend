"use client"
import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";
const Context = createContext();

const AuthContext = ({children}) => {
    const router = useRouter();
    const [usuario,setUsuario] = useState("");
    const [isAuth,setIsAuth] = useState(false);
    const [ cargando, setCargando] = useState(true);

    //Return true if the user is authenticated and set true in the state isAuth
    const isAuthenticated = async (user) => {
        //Fethc the API localhost:5000/api/users
        setCargando(true);
        try {
            const userRef = JSON.parse(user);
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-user?refresh_token=${userRef?.refreshToken || null}`);
            
            localStorage.setItem('user', JSON.stringify(data));
            setUsuario(JSON.stringify(data));
            setIsAuth(true);
            return true;
        } catch (error) {
            setIsAuth(error?.response?.data?.isAuth);
            router.push('/login');
            return false;
        }
        finally{
            setCargando(false);
        }
    }

    const logoutUser = () =>{
        if(localStorage !== undefined){
            localStorage.removeItem('user');
            setIsAuth(false);
            setUsuario("");
            router.push('/login');
        }
    }

    const getUserAuth = () =>{
        if(localStorage !== undefined){
            const user = localStorage.getItem("user");
            return user;
        }
    }
    const isUserAuth = () =>{
        const user = getUserAuth();
        if(!isAuthenticated(user)) {
            console.log("User is not authenticated")
            
            return;
        }
        return user;
    }
    useEffect(() =>{
        const user = isUserAuth();
        if(user){
            setUsuario(user);
        }
    },[]);

    return(
        <Context.Provider 
            value={{
                usuario,
                isAuth,
                isAuthenticated,
                cargando,
                logoutUser
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context
export{
    AuthContext
}
