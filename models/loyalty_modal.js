import { Schema, model } from 'mongoose';
import moment from 'moment';
const indianTimeString = moment.utc().local().utcOffset('+05:30').format('DD-MM-YYYY hh:mm:ss A');
const loyaltySchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    points: { type: Number, required: true },
    createdAt: { type: String, default: indianTimeString },
}, { versionKey: false }
);





const LoyaltyModal = model('Loyalty', loyaltySchema);



export default LoyaltyModal;
