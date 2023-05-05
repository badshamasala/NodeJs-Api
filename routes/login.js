import express from 'express';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';


const router = express.Router();
const upload = multer();
const secretKey = 'mysecretkey';

router.post('/', upload.none(), async (req, res) => {
    const { username, password } = req.body;
    const now = new Date();
  
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI);
      const collection = client.db().collection('users');
      const user = await collection.findOne({ username, password });
      if (user) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ success: true, message: 'Login successful', date: now.toISOString(), token });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect username or password' });
      }
      client.close();
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