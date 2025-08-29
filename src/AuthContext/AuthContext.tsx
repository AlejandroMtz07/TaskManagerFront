import axios from "axios";
import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

//Create the interface for the context
interface AutContextType {
    isLoged: boolean;
    setIsLoged: (value: boolean)=>void;
    logout: ()=>void;
}

//Create the context and his initial value as undefined
const AuthContext = createContext<AutContextType|undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode})=>{

    const [isLoged, setIsLogedState] = useState<boolean>(()=>{
        const stored = localStorage.getItem('isLoged');
        return stored === 'true';
    });

    const setIsLoged = (value:boolean)=>{
        setIsLogedState(value);
        localStorage.setItem('isLoged',String(value));
    }

    const logout = ()=>{
        setIsLoged(false);
        localStorage.removeItem('isLoged');
        axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true }).catch(() => {});
    }

    useEffect(()=>{
        axios.get(
            'http://localhost:3000/api/tasks',
            {withCredentials:true}
        ).then(()=>{
            setIsLoged(true);
        }).catch(()=>{
            setIsLoged(false);
        })
    },[])
    return(
        <AuthContext.Provider value={{isLoged,setIsLoged,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


