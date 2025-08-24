import Benefits from "./BenefitsComponent/Benefits";
import Description from "./DescriptionComponent/Description";
import Login from "./LoginComponent/Login";
import Navbar from "./NavbarComponent/Navbar";
import { Presentation } from "./PresentationComponent/Presentation";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Register from "./RegisterComponent/Register";
import TasksIndex from "./TaskIndex/TasksIndex";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
          element={
            <>
              <Presentation title="Task Manager App"/>
              <Navbar/>
              <Description/>
              <Benefits/>
            </>
          }
        />
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="tasks" element={<TasksIndex/>}/>
      </Routes>
    </BrowserRouter>
  )
}

