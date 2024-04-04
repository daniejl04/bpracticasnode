
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = "##%dasdsadasd##"; 


const userController = {

    getAllUsers: async (req, res) => {

        try{
            const users = await User.find()
            res.json(users)
        } catch(error){}
},


    getUserById: async (req, res) => {
       
        const Id = req.params.user

        try{
            const userId = await User.findById(Id)
            res.json(userId)
        }catch(error){
            console.error('error ')
        }
    },

    createUser: async (req, res) => {
        const userData = req.body;
        try{
            const newUser = new User(userData)
            const saveUser = await newUser.save()
            res.status(201).json(saveUser)
        }catch(error){}
    },

    updateUser: async (req, res) => {

        try{
        const {nombre} = req.params

        const userUpdate = await User.findOneAndUpdate({nombre:nombre}, {$set:{nombre:'felipe'}})
            res.json(userUpdate)

        }catch(error){

        }
    },

    deleteUser: async (req, res) => {

        try{
            const {nombre} = req.params

            const userDelete = await User.findOneAndDelete({nombre:nombre})
            res.json(userDelete)
        }catch(error){}
    },

    register: async (req, res) => {

        try{
            const users = await User.find()
            const {nombre, correo, password} = req.body

            const userData = {
                userId: users.length + 1,
                nombre: nombre,
                correo: correo,
                password: await bcrypt.hash(password,10)
            }

            const newUser = new User(userData);
            const saveUser =  await newUser.save()
            res.status(201).json(saveUser)


        }catch{
            console.error('error registering', error)
            res.status(500).json({message: 'error registering'})
        }
    },


    login: async (req, res) => {

        try{
            const {correo, password} = req.body;
            const user = await User.find({correo:correo})

            if (!user) {
                return res.status(400).json({message: 'invalid usernem or password'})
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if (!isPasswordValid) {
                return res.status(400).json({message: 'invalid usernem or password'})
            }
            const token = jwt.sign({userId: user.id}, jwt_secret, {expiresIn: "10 seconds"})

            res.json({message: 'login true', token})
        }catch{console.log('esta mal')}
    },
}

module.exports = userController
