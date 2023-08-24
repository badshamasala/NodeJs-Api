import express from 'express';
import multer from 'multer';
import LoyaltyModal from '../../models/loyalty_modal.js';

const router = express.Router();
const upload = multer();


router.post('/', upload.none(), async (req, res) => {
    const { title, desc, points } = req.body;

    const data = new LoyaltyModal({
        title,
        desc,
        points

    });
    try {

        if (!title || !desc || !points) {
            return res.status(400).json({ message: 'All fields are required' });
        } else {
            await data.save();
            res.json({ success: true, error: null, data });
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