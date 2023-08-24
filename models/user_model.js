import { Schema, model } from 'mongoose';
import moment from 'moment';
const indianTimeString = moment.utc().local().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss A');
const userSchema = new Schema({


  // User schema definition
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: String, default: indianTimeString },
  updated_at: { type: Date, default: null },
}, { versionKey: false });

// userSchema.pre('save', async function (next) {
//   try {
//     // only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) {
//       return next();
//     }
//     // hash the password using the salt
//     const hash = await bcrypt.hash(this.password, 10);
//     // override the cleartext password with the hashed one
//     this.password = hash;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });
const User = model('User', userSchema);
export default User;