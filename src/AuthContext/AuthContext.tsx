import axios from "axios";
import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

//Create the interface for the context
interface AutContextType {
    isLoged: boolean;
    setIsLoged: (value: boolean)=>void;
}

//Create the context and his initial value as undefined
const AuthContext = createContext<AutContextType|undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode})=>{

    const [isLoged, setIsLoged] = useState(false);
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
        <AuthContext.Provider value={{isLoged,setIsLoged}}>
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


