const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userId:Number,
    nombre: String,
    correo: String,
    password: String
})

// Se define un esquema de Mongoose para el usuario utilizando el constructor mongoose.Schema().
// El esquema especifica la estructura de los documentos en la colección users.

const User = mongoose.model('users', userSchema)

module.exports = User