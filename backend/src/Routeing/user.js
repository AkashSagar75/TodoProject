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
     router.get('/getuser',  auth, userdata.getuser)
   

  module.exports = router;