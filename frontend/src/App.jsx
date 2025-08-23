import React, {useState} from 'react'
import Login from './Components/Login'
import { Routes, Route, useLocation } from 'react-router-dom'
import Admin from './Components/Admin'
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
 import SidebarMan from './Manager/SidebarMan'
 import { useAuth } from './Context/AuthContext';
import AddUser from './Components/AddUser';
import AddNewTask from './Components/AddNewTask';
 import ToDO from './Components/ToDO'
  


export default function App() {
   const location = useLocation()
   const [isDrawerOpen, setIsDrawerOpen] = useState(true);
   const hindOnRoute = ["/ForgotPassword", "/UserLogin"];
  const route = hindOnRoute.includes(location.pathname);
  console.log("route", route);
    const {role} = useAuth();
  return (
    <>
    {!route && role !== "manager" && role !== "admin" && role !== "employee"  &&<Login />}
            
        
      {/* admin */}
      {role === 'admin' && (

        <div className=" flex min-h-screen">
           <Sidebar/>
          <div
            className={`flex-1 transition-all duration-300 
  ${isDrawerOpen ? "lg:ml-0" : "lg:ml-16"}
    `}  
          >
          <Navbar/>
          <Routes>

            <Route path='/Admin' element = {<Admin/>}/>
             <Route path='/Dashboard' element = {<Dashboard/>}/>
              <Route path='/employee' element= {<Employee/>}/>
              <Route  path='/adduser' element= {<AddUser/>}/>
              <Route path='/AddNewTask' element = {<AddNewTask/>}/>
               <Route path='/ToDO' element ={<ToDO/>}/>
          </Routes>
           
          </div>
           
        </div>
      )
        
        

      }

    {/* Manager */}
    {role==='manager' && (
      <>
      <div className=" flex min-h-screen">
           <SidebarMan/>
          <div
            className={`flex-1 transition-all duration-300 
  ${isDrawerOpen ? "lg:ml-0" : "lg:ml-16"}
    `}
          >
          <Navbar/>
          <Routes>

            <Route path='/Admin' element = {<Admin/>}/>
             <Route path='/Dashboard' element = {<Dashboard/>}/>
              <Route path='/employee' element= {<Employee/>}/>
              <Route path='/AddNewTask' element = {<AddNewTask/>}/>
               <Route path='/ToDO' element ={<ToDO/>}/>
          </Routes>
           
          </div>
           
        </div>
      </>
    )
      
    }
    {role === 'employee' && (

        <div className=" flex min-h-screen">
           <Sidebar/>
          <div
            className={`flex-1 transition-all duration-300 
  ${isDrawerOpen ? "lg:ml-0" : "lg:ml-16"}
    `}
          >
          <Navbar/>
          <Routes>

            
               <Route path='/Dashboard' element = {<Dashboard/>}/>
               <Route path='/ToDO' element ={<ToDO/>}/>
          </Routes>
           
          </div>
           
        </div>
      )
        
        

      }
    </>
  )
}
