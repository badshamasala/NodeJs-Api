import express from 'express';
import multer from 'multer';
import User from '../models/user_model.js';

const router = express.Router();
const upload = multer();

const checkUsernameAvailability = async (err, req, res, next) => {
    console.log(req.body)
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (user) {
        return res.status(409).json({ message: 'Username is already taken' });
      }
  
      next(); // Continue to the next middleware or route handler
    } catch (err) {
        console.log("err",err)
      res.status(500).json({ message: err.message });
    }
  };

router.put('/:id',checkUsernameAvailability, upload.none(), async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
    
        const user = await User.findById(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.username = username;
        user.updated_at = new Date();
    
        await user.save();
    
        res.json(user);
      } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
      }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       properties:
 *         username:
 *           type: string       
 *       required:
 *         - username
*/

/**
 * @swagger
 * /users/username/{id}:
 *   put:
 *     description: Update Username
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
 *             $ref: '#/components/schemas/Test'
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