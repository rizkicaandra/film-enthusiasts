const Film = require('../models/film')

class FilmController{

  static async findAll(req, res, next){
    try {
      const film = await Film.find()
      res.status(200).json(film)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next){
    try {
      const film = await Film.findById(req.params.id)
      if(!film){
        throw { 
          name : 'Custom_Error',
          errorCode: 'Not Found',
          message : 'Data Not Found',
          status : 404
        }
      } else {
      res.status(200).json(film)
      }
    } catch (error) {
      next(error)
    }
  }

  static async createFilm(req, res, next){
    try {
      if(!req.body.title || !req.body.year || !req.body.plot){
        throw { 
          name : 'Custom_Error',
          errorCode: 'Validation Error',
          message : 'Invalid Input',
          status : 400 
        }
      }
      const film = await Film.create(req.body)
      res.status(201).json(film)
    } catch (error) {
      next(error)
    }
  }

  static async destroyFilm(req, res, next){
    try {
      const film = await Film.destroyFilm(req.params.id)
      if(film.deletedCount >= 0){
        throw { 
          name : 'Custom_Error',
          errorCode: 'Not Found',
          message : 'Data Not Found',
          status : 404
        }
      } else {
        res.status(200).json({ message: 'Film is successfully deleted'})
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = FilmController