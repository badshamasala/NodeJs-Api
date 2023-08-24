import express from 'express';
import multer from 'multer';
import LoyaltyModal from '../../models/loyalty_modal.js';
import LoyaltyPointsModal from '../../models/loyalty_points_modal.js';


const router = express.Router();
const upload = multer();

router.post('/', upload.none(), async (req, res) => {
    const { _id } = req.body;



    try {
        const data = await LoyaltyModal.findByIdAndDelete({ _id: _id });
        let dpoints = data.points
        const existingPointsData = await LoyaltyPointsModal.findOne();

        if (existingPointsData) {
            // Update the points field with accumulated points
            existingPointsData.points += dpoints;
            await existingPointsData.save();
        } else {
            // If no existing data, create a new document
            const points = new LoyaltyPointsModal({
                points: dpoints
            });
            await points.save();
        }
        res.json({ success: true, error: null, data });

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