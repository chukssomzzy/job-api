const {StatusCodes} = require("http-status-codes")
const {BadRequestError,UnauthenticatedError} = require("../errors")
const User = require("../models/User")
const register = async (req,res)=>{
  const user = await User.create({...req.body})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({success:true,name:user?.getName(),token})

}
const login = async (req,res)=>{
  const {email,password} = req.body
  if(!email||!password){
    throw new BadRequestError("please provide credential")
  }
  const user = await User.findOne({email})
  if(!user)
    throw new UnauthenticatedError("Invalid Credentials")
  //compare password
  const isPasswordCorrect = await user.comparePassword(password)
  console.log(isPasswordCorrect)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError("Incorrect Password or email")
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({success:true,name:user?.getName(),token})
}



module.exports =
 {
    login,
    register
  }
