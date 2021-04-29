const router = require('express').Router()
const { route } = require('../../../codeid/services/users/routes/user.js')
const FilmController = require('../controllers/filmController.js')

router.get('/films', FilmController.findAll)

router.get('/films/:id', FilmController.findById)

router.post('/films', FilmController.createFilm)

router.delete('/films/:id', FilmController.destroyFilm)

module.exports = router