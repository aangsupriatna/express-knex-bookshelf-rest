const router = require('express').Router()
const { signIn, signUp, signOut } = require('../controller/AuthController')
const user = require('./user')
const auth = require('../middleware/auth')

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/signout', signOut)
router.use('/users', auth.isAuth, user)

module.exports = router