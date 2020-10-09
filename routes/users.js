const router = require('express').Router()
const user = require('../controller/UserController')
const auth = require('../middleware/auth')

router.get('/', user.get)
router.post('/', user.store)
router.get('/:id', user.show)
router.put('/:id', auth.isAuthorized, user.update)
router.delete('/:id', auth.isAuthorized, user.destroy)

module.exports = router