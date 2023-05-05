
import express from 'express';
import multer from 'multer';
import User from '../models/user_model.js';
import { MongoClient } from 'mongodb';

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
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const collection = client.db().collection('users');
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username Already Exist' });
    } else if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    } else {
      res.json({ message: 'User Registered Sucessfully' });
      await newUser.save()
    }
    client.close();
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