// inicializar express

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
require('@babel/register')

const userRoutes = require('../routes/user')


//creamos una constante app que ejecuta express

const app = express()

// crear la constante del puerto

const port = process.env.PORT || 3000

//middleware lo que tiene que hacer mediante las peticiones
app.use(express.json())
app.use('/api', userRoutes)



//mongoose.connect(process.env.MONGO_URI)

//const MONGO_URI = process.env.MONGO_URI

//conectar a la base de datos
mongoose.connect(process.env.MONGO_URI
    ).then(()=> console.log('conectando a la base de datos'))
    .catch((error)=>{console.log(error)})



// ruta home -> respuesta

app.get('/', (req, res)=>{
    res.send('hola desde mi api')
})


//inicializa server

app.listen(port, ()=>{
    console.log(`Servidore escuchando ${port}`)
})