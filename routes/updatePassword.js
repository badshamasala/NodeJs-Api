import express from 'express';
import multer from 'multer';
import User from '../models/user_model.js';

const router = express.Router();
const upload = multer();



router.put('/:id', upload.none(), async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
    
        const user = await User.findById(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.password = password;
        user.updated_at = new Date();
    
        await user.save();
    
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Test1:
 *       type: object
 *       properties:
 *         password:
 *           type: string       
 *       required:
 *         - password
*/

/**
 * @swagger
 * /users/password/{id}:
 *   put:
 *     description: Update Password
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           descripotion: Id is Required
 *           schema:
 *             type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test1'
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