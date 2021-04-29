const { connection } = require('../config/mongodb')
const { ObjectId } = require("bson")

class Film {
  static find() {
    return connection().collection('film').find().toArray()
  }

  static create(newFilm) {
    return connection().collection('film').insertOne(newFilm)
  }

  static findById(filmId) {
    let o_id = ObjectId(filmId)
    return connection().collection('film').findOne({ _id: o_id })
  }

  static destroyFilm(objectId) {
    return connection().collection('film').deleteOne({ _id: ObjectId(objectId)})
  }

}

module.exports = Film