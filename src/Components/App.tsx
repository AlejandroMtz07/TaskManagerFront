import Benefits from "./Index/BenefitsComponent/Benefits";
import Description from "./Index/DescriptionComponent/Description";
import Login from "./LoginComponent/Login";
import Navbar from "./NavbarComponent/Navbar";
import { Presentation } from "./PresentationComponent/Presentation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./RegisterComponent/Register";
import TasksIndex from "./TaskIndex/TasksIndex";
import Logout from "./Logout/Logout";
import NewTaskForm from "./TaskIndex/NewTaskForm/NewTaskForm";
import ProtectedRoute from "../AuthContext/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/"
            element={
              <>
                <Presentation title="Task Manager App" />
                <Navbar links={['login','register','tasks']} linkname={['Login','Register','Tasks']}/>
                <Description />
                <Benefits />
              </>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="tasks" element={
            <ProtectedRoute>
              <TasksIndex/>
            </ProtectedRoute>
          } />
          <Route path="newtask" element={
            <ProtectedRoute>
              <NewTaskForm/>
            </ProtectedRoute>} />
          <Route path="logout" element={<Logout/>} />
        </Routes>
    </BrowserRouter>
  )
}

