
const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
 const database = require('./src/config/db')
 const cors = require("cors");

 const app = express();

  const usrapi = require('./src/Routeing/user')
   const todoapi = require('./src/Routeing/todo')
 const port = 8085;


  app.use(cors({
    origin: 'https://sagartodopro.netlify.app',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
 }));
 
 app.use(express.json());

 
app.use('/user', usrapi);
 app.use('/todo', todoapi);



 
  app.listen(port, (err)=>{
     if(err)
     {
        console.log(`Server started not  at http://localhost:${port}`);
     }
     else{
        console.log(`Server   started at http://localhost:${port}`);
     }
})