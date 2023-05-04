import dotenv from "dotenv"
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
dotenv.config()
import { connect, Schema, model } from "mongoose";
const connectDB = (url) => {
  return connect(url, {
    useNewUrlParser: true,
  })
};
import { MongoClient } from 'mongodb';

const mongoUrl = 'mongodb+srv://Aarashid:badshamasala@cluster0.v0blgkl.mongodb.net/?retryWrites=true&w=majority';
const app = express();
const upload = multer();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation using Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app.js',

  ], // replace with the path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
setupSwagger(app)

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         username:
 *           type: string       
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - username
 *         - password
*/

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register a User
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


/**
 * @swagger
 * /users:
 *   get:
 *     description:  Users List
 *     responses:
 *        200:
 *          description: Success
 */


const secretKey = 'mysecretkey';

app.use(bodyParser.json());

const testSchema = new Schema({
  username: String,
  password: String,
});
const User = model('User', testSchema);


app.post('/register', upload.none(), async (req, res) => {
  // Get username and password from request body
  const { username, password } = req.body;
  // Create new user object
  const newUser = new User({
    username,
    password,
  });
  try {
    const client = await MongoClient.connect(mongoUrl);
    const collection = client.db().collection('users');
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username Already Exist' });
    } else if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    } else {
      res.json({ message: 'User Registered Sucessfully' });
      await newUser.save()
    }
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
  console.log(req.body)
})

app.post('/login', upload.none(), async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await MongoClient.connect(mongoUrl);
    const collection = client.db().collection('users');
    const user = await collection.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.json({ success: true, message: 'Login successful', token });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const collection = client.db().collection('users');
    const data = await collection.find({}).toArray();
    res.json({ status: "ok", data });
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/check', async (req, res) => {
   res.json({message:"ok"});
});
/* const client = new MongoClient(mongoUrl); */

const PORT = /* process.env.PORT ||  */3000;

const start = async () => {
  try {
    await connectDB(mongoUrl);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log("----------- error", error);
  }
};

start();
