import express from 'express';
import User from '../models/user_model.js';


const router = express.Router();



router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const data = await User.find({});
    res.json({ status: "ok", data, length: data.length });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server Error');
  }
});


/**
 * @swagger
 * /users:
 *   get:
 *     description:  Users List
 *     responses:
 *        200:
 *          description: Success
 */

export default router;