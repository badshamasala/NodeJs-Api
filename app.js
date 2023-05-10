import dotenv from "dotenv"
import express from 'express';
import bodyParser from 'body-parser';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import getUsersRoutes from './routes/getUsers.js';
import updateUsernameRoutes from './routes/updateUsername.js';
import updatePasswordRoutes from './routes/updatePassword.js';
import {connect} from "mongoose";
import setupSwagger from './swagger.js'
dotenv.config()

const connectDB = (url) => {
  return connect(url, {
    useNewUrlParser: true,
  })
};

const app = express();

app.get('/',(req,res)=> {
 res.sendFile('./public/myPage.html')
})
app.use('/',express.static('public'));
app.use(bodyParser.json());
app.use('/register',registerRoutes);
app.use('/login',loginRoutes);
app.use('/users',getUsersRoutes);
app.use('/users/username',updateUsernameRoutes);
app.use('/users/password',updatePasswordRoutes);
setupSwagger(app)





const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`),
     
    );
  } catch (error) {
    console.log("----------- error", error);
  }
};
start();
