const request = require('supertest')
const app = require('../app')

let id = 0;

describe('POST /films', function(){
  it('return status 201 with object data', function(done){
    
    const body = {
      title: 'Spiderman 3: No Way Home',
      year: 2020,
      plot: 'Spiderman is trying to get back to home',
      genres: ['Action', 'Fantasy'],
      rating: 7.1,
      directors: ['rizki','candra'],
      cast: [{
        artis: 'Robert Downey Jr',
        roleAtMovie: 'Jacob'
      },{
        artis: 'Samuel L Jackson',
        roleAtMovie: 'cecilia'
      }]
    }

    request(app)
    .post('/films')
    .send(body)
    .end((err, res) => {
      if(err){
        done()
      }

      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('title')
      expect(res.body).toHaveProperty('year')
      expect(res.body).toHaveProperty('plot')
      expect(res.body).toHaveProperty('genres')
      expect(res.body).toHaveProperty('rating')
      expect(res.body).toHaveProperty('directors')
      expect(res.body).toHaveProperty('casts')

      expect(typeof res.body).toEqual('object')
      expect(typeof res.body.id).toEqual('string')
      expect(typeof res.body.title).toEqual('string')
      expect(typeof res.body.year).toEqual('number')
      expect(typeof res.body.plot).toEqual('string')
      expect(typeof res.body.genres).toEqual('array')
      expect(typeof res.body.rating).toEqual('number')
      expect(typeof res.body.directors).toEqual('array')
      expect(typeof res.body.casts).toEqual('array')
      id = res.body.id
      done()
    })
  })

  it('return status 400 when adding films but required field is not inputed', function(done){

    const body = {
      title: '',
      year: 0,
      plot: '',
      genres: ['Action', 'Fantasy'],
      rating: 7.1,
      directors: ['rizki','candra'],
      cast: [{
        id: 1,
        roleAtMovie: 'Jacob'
      },{
        id: 2,
        roleAtMovie: 'cecilia'
      }]
    }

    request(app)
    .post('/films')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(Array.isArray(res.body.message)).toEqual(true)
      done()
    })
  })
})

describe('GET /films', function(){
  it('return status 200 with array of films', function(done){

    request(app)
    .get('/films')
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
      done()
    })
  })
})

describe('GET /toptenfilm', function(){
  it('return status 200 with array of top ten films', function(done){

    request(app)
    .get('/toptensfilm')
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
      done()
    })
  })
})

describe('GET /films/:id', function(){
  it('return status 200 with film data', function(){
    
    request(app)
    .get('/films/' + id)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('title')
      expect(res.body).toHaveProperty('year')
      expect(res.body).toHaveProperty('plot')
      expect(res.body).toHaveProperty('genres')
      expect(res.body).toHaveProperty('rating')
      expect(res.body).toHaveProperty('directors')
      expect(res.body).toHaveProperty('casts')

      expect(typeof res.body).toEqual('object')
      expect(typeof res.body.id).toEqual('string')
      expect(typeof res.body.title).toEqual('string')
      expect(typeof res.body.year).toEqual('number')
      expect(typeof res.body.plot).toEqual('string')
      expect(typeof res.body.genres).toEqual('array')
      expect(typeof res.body.rating).toEqual('number')
      expect(typeof res.body.directors).toEqual('array')
      expect(typeof res.body.casts).toEqual('array')
      done()
    })
  })

  it('Get film data that does not exist at server', function(done){
    request(app)
    .get('/film/100')
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(404)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('string')
      done()
    })
  })
})

describe('DELETE /films/:id', function(){
  it('return status 200 with message successfully deleted data', function(done){
    request(app)
    .delete('/films/' + id)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('string')
      done()
    })
  })
})