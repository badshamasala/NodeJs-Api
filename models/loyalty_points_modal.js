import { Schema, model } from 'mongoose';
import moment from 'moment';


const pointsSchema = new Schema({

    points: { type: Number, default: 0, required: true },

}, { versionKey: false }
);





const LoyaltyPointsModal = model('LoyaltyPoints', pointsSchema);



export default LoyaltyPointsModal;
