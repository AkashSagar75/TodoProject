const express = require('express')
 const auth = require('../Middleware/auth')
  const roleauth = require('../Middleware/roleauth')

 const router = express.Router()
   const userdata = require('../Controller/User')

  router.post('/Registation', auth, roleauth(["admin", "manager"]), userdata.Registation)
   router.post('/Login', userdata.Login)
   router.get('/getAllUsers', auth, roleauth(["admin", "manager"]), userdata.getAllUsers)
   router.delete('/deleteUserById/:id' , auth, roleauth(['admin',]), userdata.deleteUserById)
    router.put('/UpdateUser/:id', auth, roleauth(['admin', 'manager']), userdata.UpdateUser);
     router.get('/TotalTask', auth,  roleauth(['admin', 'manager']),userdata.TotalTask)
     router.get('/getuser',  auth,  userdata.getuser)
     router.get('/getAllTasks', auth, roleauth(['admin', 'manager']), userdata.getAllTasks)
     router.get('/getTaskStats' , auth, userdata.getAllTasks);

  module.exports = router;