 import React, { useState } from "react";
 import { BsThreeDotsVertical } from "react-icons/bs";
 import { RxCross2 } from "react-icons/rx";
  import { useNavigate } from "react-router-dom";
   import { RegisterNewUser } from "../ApiServices/Api";

export default function AddUser() {
     const navigate = useNavigate();
    
       const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      const [showPwd, setShowPwd] = useState(false);
      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);
      const [message, setMessage] = useState("");
      const [FormData, setFormData] = useState(true)
    
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      };
    
      const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email";
        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 6)
          errs.password = "Password must be at least 6 characters";
        if (!form.role) errs.role = "Please select a role";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      };
    
      const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  if (!validate()) return;

  const token = sessionStorage.getItem("token");
  console.log("token ", token);
  if (!token) return alert("Please login first!");

  setSubmitting(true);
  try {
    const res = await RegisterNewUser(form, token);
    setMessage(res.data?.message || "Registered successfully!");
    setTimeout(() => {
      setSubmitting(false);
      alert("Add New Employee successfully!");
      navigate('/employee');
    }, 700);
  } catch (err) {
    setSubmitting(false);
    setMessage(
      err?.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};
  return (
    <div>
          {FormData && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70">
                   <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                     <button
                         onClick={()=> navigate("/employee")}
                       className="absolute top-2 right-2 text-gray-500 hover:text-black"
                     >
                       ×
                     </button>
                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                 {/* Name */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Name</label>
                   <input
                     name="name"
                     type="text"
                     placeholder="Enter your name"
                     value={form.name}
                     onChange={handleChange}
                     className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                   />
                   {errors.name && (
                     <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                   )}
                 </div>
       
                 {/* Email */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700">
                     Email Address
                   </label>
                   <input
                     name="email"
                     type="email"
                     placeholder="Enter your email"
                     value={form.email}
                     onChange={handleChange}
                     className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                   />
                   {errors.email && (
                     <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                   )}
                 </div>
       
                 {/* Password */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Password</label>
                   <div className="mt-1 relative">
                     <input
                       name="password"
                       type={showPwd ? "text" : "password"}
                       placeholder="Enter password"
                       value={form.password}
                       onChange={handleChange}
                       className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                     />
                     <button
                       type="button"
                       onClick={() => setShowPwd((s) => !s)}
                       className="absolute inset-y-0 right-2 my-auto text-sm text-gray-600 hover:text-gray-900"
                     >
                       {showPwd ? "Hide" : "Show"}
                     </button>
                   </div>
                   {errors.password && (
                     <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                   )}
                 </div>
       
                 {/* Role */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Role</label>
                   <select
                     name="role"
                     value={form.role}
                     onChange={handleChange}
                     className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                   >
                     <option value="">Select a role</option>
                      
                     <option value="manager">Manager</option>
                     <option value="employee">Employee</option>
                   </select>
                   {errors.role && (
                     <p className="text-xs text-red-600 mt-1">{errors.role}</p>
                   )}
                 </div>
        <div className="flex gap-5 mb-4"> 
                 <button
                   type="submit"
                   disabled={submitting}
                   className="w-full rounded-lg bg-blue-600 py-1 font-semibold text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                 >
                   {submitting ? "Registering..." : "Register"}
                 </button>
                 <button
                   type="submit"
                  
                   className="w-full rounded-lg bg-white py-1 font-semibold text-black hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                 >
                   {submitting ? "Canceling..." : "Cancel"}
                 </button>
                 </div>
               </form>
                     </div>
                      
                     </div>
          ) }
             
                    
    </div>
  )
}
