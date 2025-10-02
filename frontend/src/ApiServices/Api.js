import axios from 'axios'
const URL = import.meta.env.VITE_API_URL;

 export const LoginApi=  async (Data)=>{
     try {
         const  res = await axios.post(`${URL}/user/Login/`, Data);
    return res
     } catch (error) {
         console.log(error)
     }
 }
  export const RegisterNewUser = async (Data, token) => {
  try {
    console.log("Sending Data to API:", Data, "Token:", token);
    const res = await axios.post(`${URL}/user/Registation`, Data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res;
  } catch (error) {
    console.log("Register Error:", error.response?.data || error.message);
    throw error;  
  }
};

export const GetAllUsers = async (token) => {
  try {
    const res = await axios.get(`${URL}/user/getAllUsers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.users;
  } catch (error) {
    console.log("Get Users Error:", error.response?.data || error.message);
    throw error;
  }
};
export const DeleteUserById = async (id, token) => {
  try {
    const res = await axios.delete(`${URL}/user/deleteUserById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error('DeleteUserById Error:', error.response?.data || error.message);
    throw error;
  }
};
export const UpdateUser = async (id, Data, token) => {
  try {
    const res = await axios.put(`${URL}/user/UpdateUser/${id}`, Data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log("Update User Error:", error.response?.data || error.message);
    throw error;
  }
};

 export const createTaskk = async (taskData, token) => {
  try {
    const res = await axios.post(`${URL}/todo/createTask/`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Create Task Error:", error.response?.data || error.message);
    throw error;
  }
};


export const GetAllUser = async (token) => {
  const res = await axios.get(`${URL}/user/getuser`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.users;
};

 export const totalTask = async(token) =>{
     try {
        const res =  await axios.get(`${URL}/user/TotalTask`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
     })
     return res.data;
     } catch (error) {
        console.error("Create Task Error:", error.res?.data || error.message);
    throw error;
     }
 }

   export const totalTaskuser = async(token) =>{
    try {
    
        const res =  await axios.get(`${URL}/user/getTaskStats`, {
        headers:{
            Authorization: `Bearer ${token}`}
        })
         return res.data
    } catch (error) {
        
    }
   }
   

    export const totalemployeetask = async(token) =>{
    try {
    
        const res =  await axios.get(`${URL}/todo/getAllemployeetsk`, {
        headers:{
            Authorization: `Bearer ${token}`}
        })
         return res.data
    } catch (error) {
        
    }
   }