
const asyncHandler = require('../middleware/asyncHandler')


const User = require('../models/userModel')

const jwtToken = require('../utils/jwtToken')



//login -- auth user get token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.checkPwd(password))) {
        jwtToken.generateToken(res, user._id)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Somthing went wrong..')
    }

});


//logout 
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};



//user registation
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const userExisits = await User.findOne({ email })
    if (userExisits) {
        res.status(401)
        throw new Error('User Exists')
    }



    //add user
    const user = await User.create({ name, email, password })

    if (user) {
        jwtToken.generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('Something went wrong')
    }
});


//get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Something went wrong')
    }
});

//update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updateUser = await user.save()
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Something went wrong')
    }
});


//get all user
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});


// delete user 
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

//get by id 
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

//update user 
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
})

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    logoutUser
};