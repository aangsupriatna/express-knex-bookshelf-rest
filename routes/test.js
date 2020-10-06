const router = require('express').Router()
const books = require('../controller/BookController')
const pages = require('../controller/PageController')
const summaries = require('../controller/SummaryController')
const auth = require('../middleware/auth')

router.get('/books', books.get)
router.post('/books', books.store)
router.get('/books/:id', books.show)
router.put('/books/:id', books.update)
router.delete('/books/:id', books.destroy)

router.get('/pages', pages.get)
router.post('/pages', pages.store)
router.get('/pages/:id', pages.show)
router.put('/pages/:id', pages.update)
router.delete('/pages/:id', pages.destroy)

router.get('/summaries', summaries.get)
router.post('/summaries', summaries.store)
router.get('/summaries/:id', summaries.show)
router.put('/summaries/:id', summaries.update)
router.delete('/summaries/:id', summaries.destroy)

module.exports = router