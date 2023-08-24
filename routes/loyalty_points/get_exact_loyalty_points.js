import express from 'express';
import LoyaltyPointsModal from '../../models/loyalty_points_modal.js';


const router = express.Router();



router.get('/', async (res) => {
    try {
        const data = await LoyaltyPointsModal.findOne({}); // Use the model to query the collection
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