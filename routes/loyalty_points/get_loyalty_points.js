import express from 'express';
import LoyaltyModal from '../../models/loyalty_modal.js';


const router = express.Router();



router.get('/', async (res) => {
    try {
        const data = await LoyaltyModal.find({}); // Use the model to query the collection
        res.json({ success: true, error: null, data });
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