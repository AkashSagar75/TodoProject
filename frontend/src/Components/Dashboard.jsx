import React from 'react'
import { BsPeople } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { RiPassPendingLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { FaCircleNotch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
   const navigate = useNavigate();
   
  return (
    <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <BsPeople className="text-4xl text-blue-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">34</h2>
          <h3 className="text-gray-500">Total Employees</h3>
        </div>
      </div>

      
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <GrUserManager className="text-4xl text-green-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">34</h2>
          <h3 className="text-gray-500">Active Employees</h3>
        </div>
      </div>

     
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <RiPassPendingLine className="text-4xl text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">34</h2>
          <h3 className="text-gray-500">Pending Task</h3>
        </div>
      </div>

  
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <GoGraph className="text-4xl text-purple-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">67%</h2>
          <h3 className="text-gray-500">Productivity</h3>
        </div>
      </div>
    </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Left Section - Recent Activities */}
      <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-700 mb-4">
          Recent Activities
        </h1>

       
        <div className="flex items-start gap-3 border-b pb-3 mb-3">
          <FaCircleNotch className="text-blue-500 mt-1" />
          <div>
            <h2 className="text-gray-700 font-medium">
              New Employee added : Sagar
            </h2>
            <p className="text-sm text-gray-500">2 Hours ago</p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b pb-3 mb-3">
          <FaCircleNotch className="text-green-500 mt-1" />
          <div>
            <h2 className="text-gray-700 font-medium">
              Task Completed by Sagar
            </h2>
            <p className="text-sm text-gray-500">2 Hours ago</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaCircleNotch className="text-purple-500 mt-1" />
          <div>
            <h2 className="text-gray-700 font-medium">
              Employee Role updated : Sagar
            </h2>
            <p className="text-sm text-gray-500">2 Hours ago</p>
          </div>
        </div>
      </div>

    
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-700 mb-4">
          Quick Actions
        </h1>
        <div className="flex flex-col gap-3">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={()=>navigate('/adduser')}
          >
            Add New Employee
          </button>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
           onClick={()=> navigate('/AddNewTask')}
          >
            Add New Task
          </button>
          <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
            Add New Project
          </button>
        </div>
      </div>
    </div>
    {}
    </>
  )
}
