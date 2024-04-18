const express = require('express')
const userController = require('../controllers/userController')
const authHandler = require('../middleware/authMiddlerware')


const router = express.Router()

router.route('/').post(userController.registerUser).get(authHandler.protect, authHandler.admin, userController.getUsers)

router.post('/login', userController.authUser)

router.post('/logout', userController.logoutUser)

router.route('/profile').get(authHandler.protect, userController.getUserProfile).post(authHandler.protect, userController.updateUserProfile)

router.route('/:id').
    delete(authHandler.protect, authHandler.admin, userController.deleteUser).
    get(authHandler.protect, authHandler.admin, userController.getUserById).
    put(authHandler.protect, authHandler.admin, userController.updateUser)

module.exports = router 