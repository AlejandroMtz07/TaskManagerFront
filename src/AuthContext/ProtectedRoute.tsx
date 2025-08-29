import type { JSX } from "react";
import { useAuth } from "./AuthContext"
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({children}:{children: JSX.Element}) {
    const {isLoged} = useAuth();
    if(!isLoged){
        return <Navigate to={'/'} replace/>
    }
    return children;
  
}
