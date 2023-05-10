import express from 'express';
import User from '../models/user_model.js';


const router = express.Router();



router.get('/',async (req, res) => {
    try {
        const data = await User.find({});
      
        res.json({ status: "ok", data ,legth: data.length});
        client.close();
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
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