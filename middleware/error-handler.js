//const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  //create custom error
  let customError = {
    //set default 
    statusCode:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || "Something went wrong check parameters or try again later",
  }
 /* if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message ,success:false})
  }*/
  if(err.code && err.code===11000){
    customError.msg= `Duplicate value entered for ${Object.keys(err.keyValue)} fields, pls choose another value`
    customError.statusCode =StatusCodes.BAD_REQUEST
  }
  if(err.name==="ValidationError"){
    customError.msg = Object.values(err.errors).map(item=>item.message).join(",")
    customError.statusCode=StatusCodes.BAD_REQUEST
  }
  if(err.name=== "CastError"){
    customError.msg= `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  return res.status(customError.statusCode).json({msg:customError.msg})
}
//future me incase u see this code just know that u are killing it 
module.exports = errorHandlerMiddleware
