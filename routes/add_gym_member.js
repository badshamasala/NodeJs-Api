import express from 'express';
import multer from 'multer';
import GymUser from '../models/gym_member.js';
import moment from 'moment';

const router = express.Router();
const upload = multer();

router.post('/', upload.none(), async (req, res) => {
    // Get all details from request body
    const { name, age, gender, weight, address, amountPaid, balance, plan } = req.body;

const indianTime = moment.utc().local().utcOffset('+05:30');  
const planDuration = getPlanDuration(plan);
    const newUser = new GymUser({
        name,
        age,
        gender,
        weight,
        address,
        amountPaid,
        balance,
        plan,
        planEndDate: indianTime.add(planDuration).format('DD-MM-YYYY hh:mm:ss A'),
    });
    try {
        if (!name || !age || !gender || !weight || !address || !amountPaid || !balance || !plan) {
            return res.status(400).json({ message: 'All fields are required' });
        } else {
            await newUser.save();
            res.json({ message: 'User Saved Sucessfully', newUser});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
    console.log(req.body)
});
  // Get plan duration in milliseconds
  function getPlanDuration(plan) {
    switch(plan) {
      case '3months':
        return 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
      case '6months':
        return 180 * 24 * 60 * 60 * 1000; // 180 days in milliseconds
      case '1year':
        return 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
      default:
        throw new Error('Invalid plan selected');
    }
  }


  

export default router;