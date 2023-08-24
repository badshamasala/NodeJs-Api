import {Schema,model} from 'mongoose';
import moment from 'moment';
const indianTimeString = moment.utc().local().utcOffset('+05:30').format('DD-MM-YYYY hh:mm:ss A');
const gymSchema = new Schema({
    name: {type:String,required:true},
    age: {type:Number,required:true},
    gender: {type:String,required:true},
    weight: {type:Number,required:true},
    address:{type:String ,required:true},
    amountPaid:{type:Number,required:true},
    balance:{type:Number,required:true},
    planStartDate: {type: String,default:indianTimeString},
    planEndDate: {type:String, required:true},
    status: {type:String, default:"ACTIVE"},
    plan: {
      type: String,
      enum: ['3months', '6months', '1year'],required:true
    },
  },{versionKey:false});



const GymUser = model('GymUser', gymSchema);

export default GymUser;