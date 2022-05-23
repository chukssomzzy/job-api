const {Schema,model,Types} = require("mongoose")


const jobSchema = new Schema({
  company:{
    type:String,
    required:[true,'please provide company name'],
    maxLength:50,
  },
  position:{
    type:String,
    required:[true,'please provide position'],
    maxLength:100,
  },
  status:{
    type:String,
    enum:['interview','declined','pending'],
    default:'pending',
  },
  createdBy:{
  type:Types.ObjectId,
  ref:'User',
  required:[true,"please provide user"]
  }
},{timestamps:true})


module.exports = model('Jobs',jobSchema)
