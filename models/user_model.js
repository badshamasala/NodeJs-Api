import {Schema,model} from 'mongoose';

const userSchema = new Schema({
  // User schema definition
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

const User = model('User', userSchema);

export default User;