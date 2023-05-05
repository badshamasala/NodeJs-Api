import express from 'express';
import { MongoClient } from 'mongodb';



const router = express.Router();



router.get('/',async (req, res) => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI);
        const collection = client.db().collection('users');
        const data = await collection.find({}).toArray();
        res.json({ status: "ok", data });
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