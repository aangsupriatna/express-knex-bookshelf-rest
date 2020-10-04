const router = require('express').Router()
const projects = require('../controller/ProjectController')
const auth = require('../middleware/auth')

router.get('/', auth.isAuthorized, projects.get)
router.post('/', projects.store)
router.get('/:id', projects.show)
router.put('/:id', projects.update)
router.delete('/:id', projects.destroy)

module.exports = router