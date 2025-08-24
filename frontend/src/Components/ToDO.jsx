import React  , {useEffect, useState}from 'react'
import { BsListTask, BsCheckCircle, BsClockHistory,   } from "react-icons/bs";
 import { useNavigate } from 'react-router-dom';
  import { totalTaskuser } from '../ApiServices/Api';
export default function ToDO() {
    const  navigate = useNavigate();
      const token =  sessionStorage.getItem("token")
     const [task,settask] = useState([]);
     
      
const initialTasks = [
  { id: 1, title: "Review quarterly performance reports", status: "inProgress", created: "2 hours ago" },
  { id: 2, title: "Update project documentation", status: "completed", created: "yesterday" },
  { id: 3, title: "Prepare presentation for client meeting", status: "overdue", created: "yesterday" },
  { id: 4, title: "Schedule team meeting for next week", status: "todo", created: "in 3 days" },
  { id: 5, title: "Review and approve budget proposal", status: "inReview", created: "tomorrow" },
  { id: 6, title: "Send monthly report to stakeholders", status: "completed", created: "2 days ago" },
];

const statusClasses = {
  completed: "bg-green-200 text-green-800",
  inProgress: "bg-yellow-200 text-yellow-800",
  overdue: "bg-red-200 text-red-800",
  todo: "bg-gray-200 text-gray-800",
  inReview: "bg-blue-200 text-blue-800",
};
    const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: task.status === "completed" ? "todo" : "completed" } : task));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: tasks.length + 1,
      title: newTask,
      status: "todo",
      created: "just now",
    };
    setTasks([...tasks, task]);
    setNewTask("");
    navigate('/AddNewTask')
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
 useEffect(()=>{
    const fatchData = async()=>{
         try {
             const res = await totalTaskuser(token);
              console.log("ttt", res);
              settask(res);
            
         } catch (error) {
           console.log("erroe", error); 
         }
    }
     fatchData()
 }, [])

  return (
    <div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {/* Total Tasks */}
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <BsListTask className="text-4xl text-blue-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">{task.totalTasks}</h2>
          <h3 className="text-gray-500">Total Tasks</h3>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <BsCheckCircle className="text-4xl text-green-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">{task.completedTasks}</h2>
          <h3 className="text-gray-500">Completed</h3>
        </div>
      </div>

      {/* In-Process Tasks */}
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <BsClockHistory className="text-4xl text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">{task.pendingTasks

}</h2>
          <h3 className="text-gray-500">In Process</h3>
        </div>
      </div>

      {/* Productivity */}
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
         
        <div>
          <h2 className="text-2xl font-bold text-gray-700">{task.productivity
}</h2>
          <h3 className="text-gray-500">Productivity</h3>
        </div>
      </div>
    </div>
      
      <div className=" w-full p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      
      {/* Add Task */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={()=>navigate('/AddNewTask')}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between mb-2 p-2 border border-gray-200 rounded hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5"
              />
              <div>
                <p className={`${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                  {task.title}
                </p>
                <span className={`text-xs px-2 py-1 rounded ${statusClasses[task.status]}`}>
                  {task.status === "completed" ? "Completed" : task.status === "inProgress" ? "In Progress" : task.status === "overdue" ? "Overdue" : task.status === "inReview" ? "In Review" : "To Do"}
                </span>{" "}
                <span className="text-xs text-gray-400 ml-1">Created {task.created}</span>
              </div>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500">
              🗑
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-500">
        {tasks.filter(t => t.status === "completed").length} completed • {tasks.length - tasks.filter(t => t.status === "completed").length} remaining
      </div>
    </div>
    </div>
  )
}
