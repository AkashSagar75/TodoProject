const express = require('express');

 const router = express.Router()
  const tododata = require('../Controller/ToDo') 
   const auth = require('../Middleware/auth')
  const roleauth = require('../Middleware/roleauth')


router.post('/createTask', auth, roleauth(["admin", "manager"]), tododata.createTask)
router.get('/getAllemployeetsk' ,auth, roleauth(["employee","admin","manager"]),tododata.getAllemployeetsk)
 
 module.exports = router;

