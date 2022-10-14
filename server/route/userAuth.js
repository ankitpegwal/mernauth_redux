const express = require('express')
const { register, login, userList, removeUser, updateProfile, updateUserImage } = require('../controllers/userAuth')
const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.get('/getList/:id',userList)
router.patch('/updateProfile',updateProfile)
router.patch('/updateUserImage/:_id',updateUserImage)
// router.get('/userProfileData/:_id',UserProfileData)


router.delete('/removeUser',removeUser)



module.exports= router