function errorHandler(err,req,res,next){

//   console.log(err)

   if (err.name == 'Custom_Error'){
      return res.status(err.status).json({ error: {
         name : err.name,
         message: err.message,
      }})
   } else {
      return res.status(500).json({ error: 'Internal Server Error' })
   }

}

module.exports = errorHandler