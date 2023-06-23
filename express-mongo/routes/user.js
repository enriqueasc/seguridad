const express = require('express')
const userSchema = require('../models/user')

const router = express.Router()

    // crear un usuario


router.post('/users', (req, res)=>{
    const user = userSchema(req.body)
    user.save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({ message: error}))
    //res.send("crear usuario")
})

//obtener usuarios

router.get('/users', (req, res)=>{
     userSchema.find()
   
    .then((data)=> res.json(data))
    .catch((error)=> res.json({ message: error}))
    //res.send("crear usuario")
})


//obtener usuarios

router.put('/users/:id', (req, res)=>{
     const {id} = req.params 
     const {name, age, email} = req.body
     userSchema.updateOne({_id: id}, {$set: {name,age,email}})
   
    .then((data)=> res.json(data))
    .catch((error)=> res.json({ message: error}))
    //res.send("crear usuario")
})





module.exports = router
