const router = require('express').Router()
const { signIn, signUp, signOut } = require('../controller/AuthController')
const auth = require('../middleware/auth')
const users = require('./users')
const companies = require('./companies')
const projects = require('./projects')

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/signout', signOut)
router.use('/users', auth.isAuth, users)
router.use('/companies', auth.isAuth, companies)
router.use('/projects', auth.isAuth, projects)

module.exports = router