import React,{useState} from 'react'
import { MdAccountBox } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa"; 
import { LoginApi } from '../ApiServices/Api';

export default function Login() {
     const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
   const [message, setMessage] = useState("");

 const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginApi(formData );
       console.log("user Login data" ,res.data,"role ", res.data.user.role)

       const token = res.data.token;
       sessionStorage.setItem("token", token)
        sessionStorage.setItem("user", JSON.stringify(res.data.user))
         sessionStorage.setItem('role', res.data.user.role)
         sessionStorage.setItem('name', res.data.user.name)

      setMessage("✅ Login Successful!");

      if(res.data.user.role === "admin"   )
      {
        Navigate('/Dashboard')
      }
      else  if( res.data.user.role ==="manager")
      {
        Navigate('/employee')
      }
       else
      {
         Navigate("/ToDO")
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login Failed");
    }
  };

   
  return (
    <>
       <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mt-10 mb-10 rounded-2xl bg-white p-8 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center text-6xl text-blue-500 mb-4">
          <MdAccountBox />
        </div>

        {/* Welcome */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
               name='email'
              placeholder="Enter email address"
               
             value={formData.email}
               onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name='password'
              placeholder="Enter password"
              value={formData.password}
          onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-600">Remember me</p>
            <p className="text-blue-500 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

         
        {message && <p className="text-center mt-3 text-sm">{message}</p>}

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="h-px w-1/4 bg-gray-300"></span>
          <span className="px-3 text-gray-500">Or continue with</span>
          <span className="h-px w-1/4 bg-gray-300"></span>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center justify-center rounded-full border border-gray-300 p-3 hover:bg-gray-100">
            <FaGoogle className="text-red-500" />
          </button>
          <button className="flex items-center justify-center rounded-full border border-gray-300 p-3 hover:bg-gray-100">
            <FaFacebookF className="text-blue-600" />
          </button>
        </div>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Sign up here
          </span>
        </p>
      </div>
    </div>
    
    </>
  )
}
