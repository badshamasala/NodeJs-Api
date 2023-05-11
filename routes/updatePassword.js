import express from 'express';
import multer from 'multer';
import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
const upload = multer();
const secretKey = 'mysecretkey';


router.put('/', upload.none(), async (req, res) => {
  try {
      const token= req.headers.authorization.split(" ")[1]
      const { password } = req.body;
      const {userId} = jwt.verify(token, secretKey);
    
      const user = await User.findByIdAndUpdate(userId, { password, updated_at: new Date() }, { new: true });
  
      if (!user) {
          return res.status(404).json({ message: 'User not found Please Check' });
      }
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