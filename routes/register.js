
import express from 'express';
import multer from 'multer';
import User from '../models/user_model.js';

const router = express.Router();
const upload = multer();

router.post('/', upload.none(), async (req, res) => {
  // Get username and password from request body
  const { username, password } = req.body;
  // Create new user object

  const newUser = new User({
    username,
    password,

  });
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username Already Exist' });
    } else if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    } else {
      await newUser.save();
      res.json({ message: 'User Registered Sucessfully', newUser });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
  console.log(req.body)
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         username:
 *           type: string       
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - username
 *         - password
*/

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register a User
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