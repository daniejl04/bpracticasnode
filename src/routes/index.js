const express = require('express') 

const router = express.Router()

const userController = require('../controllers/userController')

const auth = require('../middleware/auth.js')

router.get('/api/v1/users', auth.authenticate(), userController.getAllUsers);
// router.get('/api/v1/users', userController.getAllUsers)
router.get('/api/v1/users/id/:id', userController.getUserById)
router.post('/api/v1/users', userController.createUser)
router.patch('/api/v1/users/update/:nombre', userController.updateUser)
router.delete('/api/v1/users/delete/:nombre', userController.deleteUser)
router.post('/register',userController.register)
router.post('/login',userController.login)


module.exports = router;