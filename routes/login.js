import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';
import moment from 'moment';
const router = express.Router();
const upload = multer();
const secretKey = 'mysecretkey';

router.post('/', upload.none(), async (req, res) => {
  const { username, password } = req.body;
  const indianTimeString = moment.utc().local().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss A');
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, userId: user._id }, secretKey, { expiresIn: '1h' });
      res.json({ success: true, message: 'Login successful', loginAt: indianTimeString, token });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});



/**
 * @swagger
 * /login:
 *   post:
 *     description: Login a User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *       required: true
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

export default router;