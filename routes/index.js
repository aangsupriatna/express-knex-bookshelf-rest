const router = require('express').Router()
const { signIn, signUp, signOut, whoAmI } = require('../controller/AuthController')
const auth = require('../middleware/auth')
const users = require('./users')
const companies = require('./companies')
const projects = require('./projects')
const test = require('./test')

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/signout', signOut)
router.get('/whoami', auth.isAuth, whoAmI)
router.use('/users', auth.isAuth, users)
router.use('/companies', auth.isAuth, companies)
router.use('/projects', auth.isAuth, projects)
router.use('/test', auth.isAuth, test)

module.exports = router